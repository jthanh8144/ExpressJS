const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String },
    slug:{ type: String, slug: 'name', unique: true },
    videoID:{ type: String, required: true },
}, {
    _id: false,
    timestamps: true,
});

// Custom query helper
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all' 
});
CourseSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Course', CourseSchema);
