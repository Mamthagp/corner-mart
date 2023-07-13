# Schema design

# 1. user
* _id (generates automatically by mongoDB)
* email
* password
* role

# 2. resident schema
* _id (generates automatically by mongoDB)
* name
* mobile
* block
* doorNumber
* address // later
* isApproved : false
* residentType
* profile // later

# 3. store schema
* _id (generates automatically by mongoDB)
* name
* details
* timing (of the store)

# 4. products
* _id (generates automatically by mongoDB)
* name
* price
* inStock (true : false)
* store - Schema.Types.ObjectId
* unit
* image