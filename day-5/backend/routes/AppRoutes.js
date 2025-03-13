class AppRoutes {   
    restaurants = (restaurantsController) => {
        app.post("/restaurants",  restaurantsController.create);             
        app.get("/restaurants",  restaurantsController.readAll);     
        app.get("/restaurants/:id", restaurantsController.readById);
        app.put("/restaurants/:id", restaurantsController.update);
        app.delete("/restaurants/:id", restaurantsController.remove);
    }
    
    root = (appController) => {
        app.get("/", appController.serverRootAction); 
    }
}

module.exports = AppRoutes;