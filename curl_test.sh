curl -X GET \
  -H "X-Parse-Application-Id: voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r" \
  -H "X-Parse-REST-API-Key: QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf" \
  -G \
  --data-urlencode 'where={"createdAt":{"$gte":' \
  https://api.parse.com/1/classes/chatterbox
