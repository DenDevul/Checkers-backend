migrate((db) => {
  const collection = new Collection({
    "id": "pl8bxgllbj2jiv6",
    "created": "2023-04-17 23:53:29.287Z",
    "updated": "2023-04-17 23:53:29.287Z",
    "name": "games",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "nqrnkgm7",
        "name": "player1",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "5ekshvgw",
        "name": "player2",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pl8bxgllbj2jiv6");

  return dao.deleteCollection(collection);
})
