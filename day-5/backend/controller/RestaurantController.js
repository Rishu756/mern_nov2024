//RestaurantModel
class RestaurantController {
    create = async (request, response) => {
        const form = { ...request.body };
        
        let rbody = { };
        let rstatus = 200;

        try {
            const restaurantModel = new RestaurantModel( {
                restaurant_name: form.restaurant_name, 
                restaurant_type: form.restaurant_type,
                location: form.location,
                food: form.food,
                rating: form.rating
            } );
            const restaurantModelRes = await restaurantModel.save();

            const restaurantDoc = await RestaurantModel.findOne({_id: restaurantModel._id}).lean();

            rbody = {
                data : restaurantDoc,
                isError: false
            };

            console.log("create", rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in creating restaurant.\n${error}`},
                isError: true
            };         

            console.log("create", rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }     

    update = async (request, response) => {
        //path variables
        const id = request.params.id;
        //form posted
        const form = { ...request.body };
        
        //
        let rbody = {};
        let rstatus = 200;

        try {
            const updatableRestaurant = {
            restaurant_name: form.restaurant_name, 
            restaurant_type: form.restaurant_type,
            location: form.location,
            food: form.food,
            rating: form.rating
            };  
            const restaurantModelRes = await RestaurantModel.findOneAndUpdate(
                        { _id : id }, 
                        updatableRestaurant, 
                        {new: true});
            const updatedRestaurant = await RestaurantModel.findOne({ _id: id });
            
            if(!updatedRestaurant) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                 console.log(rbody); 

                rstatus = 404;
            }
            else {
                rbody = {
                    data : updatedRestaurant,
                    isError: false,
                    isLoggedIn: true
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in updating restaurant.\n${error}`},
                isError: true,
                isLoggedIn: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);        
    }
    
    remove = async (request, response) => {
        const id = request.params.id;
        
        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantModelRes = await RestaurantModel.findOneAndDelete({ _id : id });

            if(!restaurantModelRes) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                console.log(rbody); 

                rstatus = 404;
            } 
            else {
                rbody = {
                    data : {message: "restaurant is Deleted successfully."},
                    isError: false
                }; 

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in deleting restaurant.\n${error}`},
                isError: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }  

    readAll = async (request, response) => {
        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantDocs = await RestaurantModel.find().lean();

            rbody = {
                data : restaurantDocs,
                isError: false
            };
            
            console.log(rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading all restaurants.\n${error}`},
                isError: true
            };

            console.log(rbody);

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);  
    }
    
    readById = async (request, response) => {
        const id = request.params.id;

        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantDoc = await RestaurantModel.findOne({ _id : id }).lean(); 

            if(!restaurantDoc) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                 console.log(rbody);

                rstatus = 404;
            }
            else {
                rbody = {
                    data : restaurantDoc,
                    isError: false
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading restaurant.\n${error}`},
                isError: false
            };

             console.log(rbody);  

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }

}

module.exports = RestaurantController;