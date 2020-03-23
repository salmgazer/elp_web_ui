import {synchronize} from "@nozbe/watermelondb/sync";
import LocalInfo from "./LocalInfo";

const apiUrl = 'https://elp-core-api-dev.herokuapp.com/v1/client';

export default class SyncService {
  static async sync(companyId, branchId, userId, database) {
    console.log("ABOUT TO SYNC");
    if (companyId && branchId) {
      await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
          let queryString = '';

          console.log("*************************");
          console.log("*************************");
          console.log(lastPulledAt);
          console.log("*************************");
          console.log("*************************");

          queryString = `${queryString}&company_id=${companyId}&branch_id=${branchId}`;
          if (lastPulledAt) {
            queryString = `last_pulled_at=${lastPulledAt}&${queryString}`;
          }

          const response = await fetch(`${apiUrl}/users/${userId}/sync?${queryString}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': LocalInfo.accessToken
            }
          });
          if (!response.ok) {
            throw new Error(await response.text())
          }

          const {changes, timestamp} = await response.json();

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

          return {changes, timestamp};
        },
        pushChanges: async ({changes, lastPulledAt}) => {
          let queryString = '';

          queryString = `${queryString}&company_id=${companyId}&branch_id=${branchId}`;

          if (lastPulledAt) {
            queryString = `last_pulled_at=${lastPulledAt}&${queryString}`;
          }

          const response = await fetch(`${apiUrl}/users/${userId}/sync?${queryString}`, {
            method: 'POST',
            body: JSON.stringify(changes),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': LocalInfo.accessToken
            }
          });
          console.log("DONE SYNCING");
          if (!response.ok) {
            throw new Error(await response.text())
          }
        },
      });
    } else {
      console.error('branchId and companyId are required to sync');
    }
  }
}
