migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Q94GWjc` ON `games` (`gameUrl`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZxTrBw9` ON `games` (`gameUrl`)"
  ]

  return dao.saveCollection(collection)
})
