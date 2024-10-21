/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  collection.listRule = "@request.auth.id = utilisateur.id"
  collection.createRule = "@request.data.utilisateur.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  collection.listRule = null
  collection.createRule = ""

  return dao.saveCollection(collection)
})
