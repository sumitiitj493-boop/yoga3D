const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Asana = require('./models/Asana');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const asanas = [
    { name: 'Tadasana', sanskritName: 'Mountain Pose', difficulty: 'Beginner', description: 'Stand tall like a mountain. Foundation of all standing poses.', benefits: ['Improves posture', 'Strengthens thighs', 'Relieves sciatica'], imageUrl: 'assets/images/tadasana.jpg', modelUrl: 'assets/models/tadasana.glb' },
    { name: 'Vrikshasana', sanskritName: 'Tree Pose', difficulty: 'Beginner', description: 'Balance on one leg like a tree. Builds focus and concentration.', benefits: ['Improves balance', 'Strengthens legs', 'Opens hips'], imageUrl: 'assets/images/tree.jpg', modelUrl: 'assets/models/tree.glb' },
    { name: 'Adho Mukha Svanasana', sanskritName: 'Downward Dog', difficulty: 'Beginner', description: 'Classic inversion pose that energizes the entire body.', benefits: ['Calms the brain', 'Energizes body', 'Stretches shoulders'], imageUrl: 'assets/images/downdog.jpg', modelUrl: 'assets/models/downdog.glb' },
    { name: 'Balasana', sanskritName: 'Child Pose', difficulty: 'Beginner', description: 'Restful pose that gently stretches the back and hips.', benefits: ['Relieves stress', 'Stretches hips', 'Calms mind'], imageUrl: 'assets/images/childs.jpg', modelUrl: 'assets/models/childs.glb' },
    { name: 'Sukhasana', sanskritName: 'Easy Pose', difficulty: 'Beginner', description: 'Classic meditation pose. Opens hips and calms the mind.', benefits: ['Opens hips', 'Calms mind', 'Improves posture'], imageUrl: 'assets/images/sukhasana.jpg', modelUrl: 'assets/models/sukhasana.glb' },
    { name: 'Virabhadrasana II', sanskritName: 'Warrior II', difficulty: 'Intermediate', description: 'Powerful standing pose named after a fierce warrior.', benefits: ['Strengthens legs', 'Opens hips', 'Improves stamina'], imageUrl: 'assets/images/warrior2.jpg', modelUrl: 'assets/models/warrior2.glb' },
    { name: 'Trikonasana', sanskritName: 'Triangle Pose', difficulty: 'Intermediate', description: 'Triangle shape creates stability and balance.', benefits: ['Stretches legs', 'Opens chest', 'Relieves stress'], imageUrl: 'assets/images/triangle.jpg', modelUrl: 'assets/models/triangle.glb' },
    { name: 'Setu Bandhasana', sanskritName: 'Bridge Pose', difficulty: 'Intermediate', description: 'Rejuvenating backbend that opens the chest.', benefits: ['Stretches spine', 'Calms brain', 'Reduces anxiety'], imageUrl: 'assets/images/bridge.jpg', modelUrl: 'assets/models/bridge.glb' },
    { name: 'Bhujangasana', sanskritName: 'Cobra Pose', difficulty: 'Intermediate', description: 'Energizing backbend that strengthens the spine.', benefits: ['Strengthens spine', 'Opens heart', 'Firms buttocks'], imageUrl: 'assets/images/cobra.jpg', modelUrl: 'assets/models/cobra.glb' },
    { name: 'Sirsasana', sanskritName: 'Headstand', difficulty: 'Advanced', description: 'King of asanas. Powerful inversion that calms the brain.', benefits: ['Strengthens core', 'Improves focus', 'Calms brain'], imageUrl: 'assets/images/headstand.jpg', modelUrl: 'assets/models/headstand.glb' },
    { name: 'Bakasana', sanskritName: 'Crow Pose', difficulty: 'Advanced', description: 'Arm balance that builds tremendous strength and focus.', benefits: ['Strengthens arms', 'Tones abs', 'Improves balance'], imageUrl: 'assets/images/crow.jpg', modelUrl: 'assets/models/crow.glb' },
    { name: 'Natarajasana', sanskritName: 'Dancer Pose', difficulty: 'Advanced', description: 'Elegant balance pose combining strength and grace.', benefits: ['Improves balance', 'Stretches chest', 'Develops grace'], imageUrl: 'assets/images/dancer.jpg', modelUrl: 'assets/models/dancer.glb' }
];

const importData = async () => {
    try {
        await Asana.deleteMany();
        await Asana.create(asanas);
        console.log('✅ Imported 12 yoga poses! (5 Beginner, 4 Intermediate, 3 Advanced)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

importData();
