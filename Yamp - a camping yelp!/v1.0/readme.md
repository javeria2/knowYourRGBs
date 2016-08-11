#Restful Routing

a way to define our routes. 

CREATE READ UPDATE DESTROY (CRUD)

REST is a mapping between HTTP routes and CRUD 

example: BLOG ---
/destroyBlog/:id
/updateBlog/:id
/allBlogs

WHY? - Its conventional and reliable. So others can understand our code and we can understand other RESTful APIs. 
Index = /dogs (starting point), GET 
New = /dogs/new (add new dog), GET
Create = /dogs (create and redirect), POST
Show = /dogs/:id (show info), GET
Edit = /dogs/:id (edit info), GET
Update = /dogs/:id (update info), PUT
Destroy = /dogs/:id (delete info), DELETE 