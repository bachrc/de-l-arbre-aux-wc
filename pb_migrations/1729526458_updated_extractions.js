/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  collection.updateRule = "@request.auth.id = utilisateur.id"
  collection.deleteRule = "@request.auth.id = utilisateur.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a3ohzxb6zpqym11")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
