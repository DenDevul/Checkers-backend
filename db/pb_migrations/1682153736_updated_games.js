migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whsltqrh",
    "name": "result",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "*",
        "1-0",
        "0-1",
        "1/2-1/2"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whsltqrh",
    "name": "result",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "\"*\"",
        "\"1-0\"",
        "\"0-1\"",
        "\"1/2-1/2\""
      ]
    }
  }))

  return dao.saveCollection(collection)
})
