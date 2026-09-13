const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB for Blog seeding...'))
    .catch((err) => console.error('MongoDB connection error:', err));

const samplePost = {
    title: 'Understanding Multiclass Confusion Matrices',
    slug: 'multiclass-confusion-matrices',
    description: 'A quick note on precision, recall, and N x N evaluation grids.',
    content: `
When transitioning from binary to multiclass classification, evaluation metrics become slightly more complex. 

### Precision, Recall, and F1 Score
Instead of a simple 2x2 grid, the matrix expands to *N x N*. 

* **Precision:** Out of all instances the model predicted as class *A*, how many were actually class *A*?
* **Recall:** Out of all actual class *A* instances, how many did the model correctly identify?

Here is a standard snippet to calculate this:
\`\`\`python
from sklearn.metrics import classification_report
print(classification_report(y_true, y_pred))
\`\`\`

Understanding the tradeoff between bias and variance is critical before relying solely on these metrics.
    `
};

const seedDB = async () => {
    try {
        await Blog.deleteMany({});
        await Blog.create(samplePost);
        console.log('✅ Blog successfully seeded!');
    } catch (error) {
        console.error('Error seeding blog:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();