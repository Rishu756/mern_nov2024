class AppModel {
    RestaurantModel = () => {
        const collection_name = 'restaurants';
        const collection_fields = {
            restaurant_name: String, 
            restaurant_type: String,
            location: String,
            food: String,
            rating: {
                type : Number,
                max : 5
            }
        };
        const collection_config = {
            timestamps: false
        };
        
        const schema = mongoose.Schema(collection_fields, collection_config);
        const Model = mongoose.model(collection_name, schema);
    
        return Model;
    }
}

module.exports = AppModel;