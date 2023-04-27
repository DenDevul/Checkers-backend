migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

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
    "id": "nqrnkgm7",
    "name": "player1",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ekshvgw",
    "name": "player2",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfiawugd",
    "name": "gameUrl",
    "type": "text",
    "required": false,
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
    "id": "nqrnkgm7",
    "name": "player1",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ekshvgw",
    "name": "player2",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
