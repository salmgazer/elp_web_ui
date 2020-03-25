import {synchronize} from "@nozbe/watermelondb/sync";
import LocalInfo from "./LocalInfo";
import Api from "./Api";

const apiUrl = 'http://localhost:8081/v1/client';

export default class SyncService {
  static async sync(companyId, branchId, userId, database) {
    console.log("ABOUT TO SYNC");
    if (companyId && branchId) {
      await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
          let queryString = '';


          const products = await database.collections.get('products').query().fetch();
          const brands = await database.collections.get('brands').query().fetch();
          const manufacturers = await database.collections.get('manufacturers').query().fetch();
          const productCategories = await database.collections.get('product_categories').query().fetch();

          const globalEntities = {
            products: products.map(p => p.id),
            brands: brands.map(b => b.id),
            manufacturers: manufacturers.map(m => m.id),
            product_categories: productCategories.map(pc => pc.id)
          };

          queryString = `${queryString}company_id=${companyId}&branch_id=${branchId}&global_entities=${JSON.stringify(globalEntities)}`;
          if (lastPulledAt) {
            queryString = `last_pulled_at=${lastPulledAt}&${queryString}`;
          }

          console.log(queryString);

          const response = await new Api('others').index(
            {},
            {'Authorization': `Bearer ${LocalInfo.accessToken}`},
            `${apiUrl}/users/${userId}/sync?${queryString}`,
          );

          if (!response) {
            throw new Error(await response.text())
          }

          const {changes, timestamp} = await response.data;
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

          return {changes, timestamp};
        },
        pushChanges: async ({changes, lastPulledAt}) => {
          let queryString = '';

          queryString = `${queryString}company_id=${companyId}&branch_id=${branchId}`;

          if (lastPulledAt) {
            queryString = `last_pulled_at=${lastPulledAt}&${queryString}`;
          }

          console.log("WE ARE HERE ABOUT TO PUSH");

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
