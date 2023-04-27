migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Q94GWjc` ON `games` (`url`)"
  ]

  // add
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfiawugd",
    "name": "url",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edhfd4xr",
    "name": "fen",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Q94GWjc` ON `games` (`gameUrl`)"
  ]

  // remove
  collection.schema.removeField("whsltqrh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfiawugd",
    "name": "gameUrl",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edhfd4xr",
    "name": "gameFEN",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
