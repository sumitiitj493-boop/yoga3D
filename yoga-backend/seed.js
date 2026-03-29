const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Asana = require('./models/Asana');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const asanas = [
    { name: 'Tadasana', sanskritName: 'Mountain Pose', difficulty: 'Beginner', description: 'Stand tall like a mountain. Foundation of all standing poses.', benefits: ['Improves posture', 'Strengthens thighs', 'Relieves sciatica'], imageUrl: 'assets/images/tadasana.jpg', modelUrl: 'assets/gifs/tadasana.gif', modelType: 'gif' },
    { name: 'Vrikshasana', sanskritName: 'Tree Pose', difficulty: 'Beginner', description: 'Balance on one leg like a tree. Builds focus and concentration.', benefits: ['Improves balance', 'Strengthens legs', 'Opens hips'], imageUrl: 'assets/images/tree.jpg', modelUrl: 'https://sketchfab.com/models/02d5ac37825241eab18178c7c386f9e7/embed', modelType: 'sketchfab' },
    { name: 'Adho Mukha Svanasana', sanskritName: 'Downward Dog', difficulty: 'Beginner', description: 'Classic inversion pose that energizes the entire body.', benefits: ['Calms the brain', 'Energizes body', 'Stretches shoulders'], imageUrl: 'assets/images/downdog.jpg', modelUrl: 'https://sketchfab.com/models/836a5d9a08d74f7ea2ff353f7e550506/embed', modelType: 'sketchfab' },
    { name: 'Balasana', sanskritName: 'Child Pose', difficulty: 'Beginner', description: 'Restful pose that gently stretches the back and hips.', benefits: ['Relieves stress', 'Stretches hips', 'Calms mind'], imageUrl: 'assets/images/childs.jpg', modelUrl: 'assets/gifs/balasana.gif', modelType: 'gif' },
    { name: 'Sukhasana', sanskritName: 'Easy Pose', difficulty: 'Beginner', description: 'Classic meditation pose. Opens hips and calms the mind.', benefits: ['Opens hips', 'Calms mind', 'Improves posture'], imageUrl: 'assets/images/sukhasana.jpg', modelUrl: 'https://sketchfab.com/models/f22877c3db1b4365b29faaef9d1ce239/embed', modelType: 'sketchfab' },
    { name: 'Virabhadrasana II', sanskritName: 'Warrior II', difficulty: 'Intermediate', description: 'Powerful standing pose named after a fierce warrior.', benefits: ['Strengthens legs', 'Opens hips', 'Improves stamina'], imageUrl: 'assets/images/warrior2.jpg', modelUrl: 'https://sketchfab.com/models/a56eff0e9e9b4d5ebc79b37ec9f748f4/embed', modelType: 'sketchfab' },
    { name: 'Trikonasana', sanskritName: 'Triangle Pose', difficulty: 'Intermediate', description: 'Triangle shape creates stability and balance.', benefits: ['Stretches legs', 'Opens chest', 'Relieves stress'], imageUrl: 'assets/images/triangle.jpg', modelUrl: 'assets/gifs/trikonasana.gif', modelType: 'gif' },
    { name: 'Parivrtta Trikonasana', sanskritName: 'Revolved Triangle Pose', difficulty: 'Intermediate', description: 'Deep twist that combines balance, strength and spinal rotation.', benefits: ['Improves digestion', 'Stretches spine', 'Strengthens legs', 'Enhances balance'], imageUrl: 'assets/images/revolved-triangle.jpg', modelUrl: 'https://sketchfab.com/models/7c37c060b695426f8034fc034330ddee/embed', modelType: 'sketchfab' },
    { name: 'Setu Bandhasana', sanskritName: 'Bridge Pose', difficulty: 'Intermediate', description: 'Rejuvenating backbend that opens the chest.', benefits: ['Stretches spine', 'Calms brain', 'Reduces anxiety'], imageUrl: 'assets/images/bridge.jpg', modelUrl: 'https://sketchfab.com/models/02418adcb5ce444d8a363bb55d01d9f1/embed', modelType: 'sketchfab' },
    { name: 'Bhujangasana', sanskritName: 'Cobra Pose', difficulty: 'Intermediate', description: 'Energizing backbend that strengthens the spine.', benefits: ['Strengthens spine', 'Opens heart', 'Firms buttocks'], imageUrl: 'assets/images/cobra.jpg', modelUrl: 'https://sketchfab.com/models/88c5e04dda4d414e888bbce9caf8c505/embed', modelType: 'sketchfab' },
    { name: 'Paschimottanasana', sanskritName: 'Seated Forward Bend', difficulty: 'Intermediate', description: 'Deep forward fold that stretches the entire back body. Calming and introspective pose.', benefits: ['Stretches spine and hamstrings', 'Calms the mind', 'Relieves stress', 'Improves digestion'], imageUrl: 'assets/images/seated-forward.jpg', modelUrl: 'https://sketchfab.com/models/f0c39870108248438787f1d26e314bf1/embed', modelType: 'sketchfab' },
    { name: 'Sirsasana', sanskritName: 'Headstand', difficulty: 'Advanced', description: 'King of asanas. Powerful inversion that calms the brain.', benefits: ['Strengthens core', 'Improves focus', 'Calms brain'], imageUrl: 'assets/images/headstand.jpg', modelUrl: 'https://sketchfab.com/models/e199a7a6f1dc4de196928da0621bcae3/embed', modelType: 'sketchfab' },
    { name: 'Halasana', sanskritName: 'Plow Pose', difficulty: 'Advanced', description: 'Powerful inversion where legs extend over the head. Calms the nervous system.', benefits: ['Stimulates thyroid', 'Stretches shoulders and spine', 'Reduces stress and fatigue', 'Improves digestion'], imageUrl: 'assets/images/plow.jpg', modelUrl: 'https://sketchfab.com/models/c8542bea8a4e4a18b8d51769fe75d268/embed', modelType: 'sketchfab' },
    { name: 'Bakasana', sanskritName: 'Crow Pose', difficulty: 'Advanced', description: 'Arm balance that builds tremendous strength and focus.', benefits: ['Strengthens arms', 'Tones abs', 'Improves balance'], imageUrl: 'assets/images/crow.jpg', modelUrl: 'assets/gifs/bakasana.gif', modelType: 'gif' },
    { name: 'Tittibhasana', sanskritName: 'Firefly Pose', difficulty: 'Advanced', description: 'Challenging arm balance requiring strength, flexibility and balance.', benefits: ['Strengthens arms and wrists', 'Stretches hamstrings', 'Improves core strength', 'Builds confidence'], imageUrl: 'assets/images/firefly.jpg', modelUrl: 'https://sketchfab.com/models/ccd408ccdbd741e59764d3fda9a675f5/embed', modelType: 'sketchfab' }
];

const importData = async () => {
    try {
        await Asana.deleteMany();
        await Asana.create(asanas);
        console.log('✅ Imported 15 yoga poses! (5 Beginner, 6 Intermediate, 4 Advanced)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

importData();
