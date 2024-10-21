/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfng6bok",
    "name": "notes",
    "type": "editor",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  // remove
  collection.schema.removeField("cfng6bok")

  return dao.saveCollection(collection)
})
