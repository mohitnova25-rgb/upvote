Run:- 
  npm install

create env:
  MONGO_URI=mongodb://127.0.0.1:27017/publicfeed
  PORT=3000

How cursor pagination works
  createdAt DESC
  _id

  -------
  No Duplicates
  Stable ordering
  work even if multiple posts share same timestamp


How Up Votes Uniqueness

  created unique compound index
  only one upvote per user per post
  safe even under concurrency
  MongoDb enforces Constraint at DB level
  