import {synchronize} from "@nozbe/watermelondb/sync";
import LocalInfo from "./LocalInfo";
import Api from "./Api";
import {Q} from "@nozbe/watermelondb";
import globalModels from '../models/globalModels';

const apiUrl = 'https://core-api-dev.mystoreaid.net/v1/client';

export default class SyncService {
  static async sync(companyId, branchId, userId, database) {
    console.log("ABOUT TO SYNC");
    if (companyId && branchId) {
      await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
          let queryString = '';

          queryString = `${queryString}company_id=${companyId}&branch_id=${branchId}`;
          /*if (LocalInfo.lastSyncedAt) {
            queryString = `last_pulled_at=${LocalInfo.lastSyncedAt}&${queryString}`;
          }*/

          const response = await new Api('others').index(
            {},
            {'Authorization': `Bearer ${LocalInfo.accessToken}`},
            `${apiUrl}/users/${userId}/sync?${queryString}`,
          );

          if (!response) {
            throw new Error(await response.text())
          }

          const {changes, timestamp, otherChanges} = await response.data;
          console.log(changes);
          console.log(otherChanges);
          LocalInfo.lastSyncedAt = timestamp;
          /*
          console.log(changes.products);

          // check if row does not exist and move it from updated to created
          const tables = Object.keys(changes);

          for (let m = 0; m < tables.length; m++) {
            const tablename = tables[m];
            const updated = changes[tablename].updated;
            for (let i = 0; i < updated.length; i++) {
              const rowToUpdate = updated[i];
              let existingRow = await database.collections.get(tablename)
                .find(rowToUpdate.id);
              existingRow = existingRow[0];
              if (typeof existingRow === "undefined") {
                // add to created
                changes[tablename].created.push(rowToUpdate);
                // remove from updated
                changes[tablename].updated = changes[tablename].updated.filter(row => row.id !== rowToUpdate.id);
              }
            }
          }

          for (let m = 0; m < tables.length; m++) {
            const tablename = tables[m];
            const created = changes[tablename].created;
            for (let i = 0; i < created.length; i++) {
              const rowToCreate = created[i];
              const existingRow = await database.collections.get(tablename)
                .find(rowToCreate.id);
              if (existingRow) {
                // add to updated
                changes[tablename].updated.push(rowToCreate);
                // remove from created
                changes[tablename].created = changes[tablename].created.filter(row => row.id !== rowToCreate.id);
              }
            }
          }
          */


          database.action(async () => {
            for (const globalModel of globalModels) {
              if (otherChanges[globalModel.table]) {
                for (const row of otherChanges[globalModel.table]) {
                  const collection = database.collections.get(globalModel.table);
                  const existingRows = await collection
                    .query(Q.where(globalModel.displayColumn, row[globalModel.displayColumn])).fetch();

                  for (const existingRow of existingRows) {
                    await existingRow.destroyPermanently();
                  }
                  await collection.create(aRow => {
                    globalModel.columns.forEach(column => {
                      if (row[column]) {
                        aRow[column] = row[column];
                      }
                    });
                    aRow._raw.id = row.id;
                  });
                }
              }
            }
          });

          return {changes, timestamp};
        },
        pushChanges: async ({changes, lastPulledAt}) => {
          let queryString = '';

          queryString = `${queryString}company_id=${companyId}&branch_id=${branchId}`;

          if (LocalInfo.lastSyncedAt) {
            queryString = `last_pulled_at=${LocalInfo.lastSyncedAt}&${queryString}`;
          }

          globalModels.forEach(globalModel => {
            delete changes[globalModel.table];
          });

          const response = await new Api('others').create(
            JSON.stringify(changes),
            {'Authorization': `Bearer ${LocalInfo.accessToken}`},
            {},
            `${apiUrl}/users/${userId}/sync?${queryString}`
          );

          console.log("DONE SYNCING");
          if (!response) {
            throw new Error(await response.text())
          }
        },
      });
    } else {
      console.error('branchId and companyId are required to sync');
    }
  }
}
