const userStoreSchema = {
  name: "users_stores",
  columns: [
    { name: "user_id", type: "string" },
    { name: "store_id", type: "string" },
    { name: "role", type: "string" },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" }
  ]
};

export default userStoreSchema;
