/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxftgaae",
    "name": "poids_cafe",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxftgaae",
    "name": "poids_cafe",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})
