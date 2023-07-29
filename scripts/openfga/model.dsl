model
  schema 1.1
type user
type document
  relations
    define owner: [user]
    define writer: [user]
    define reader: [user]
    define can_read: reader or writer or owner
    define can_write: writer or owner
