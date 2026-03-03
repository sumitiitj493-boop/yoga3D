# 🧘 Supported Yoga Poses - Quick Reference

## Current Pose Library

Your app includes **12 yoga poses** in the database. Here's their status:

| # | Pose Name | Sanskrit | Difficulty | Procedural 3D | Real Model | Status |
|---|-----------|----------|------------|---------------|------------|--------|
| 1 | Mountain Pose | Tadasana | Beginner | ✅ Enhanced | 📁 Optional | ✅ Working |
| 2 | Tree Pose | Vrikshasana | Beginner | ✅ Enhanced | 📁 Optional | ✅ Working |
| 3 | Downward Dog | Adho Mukha Svanasana | Beginner | ✅ Enhanced | 📁 Optional | ✅ Working |
| 4 | Child's Pose | Balasana | Beginner | ✅ Enhanced | 📁 Optional | ✅ Working |
| 5 | Easy Pose | Sukhasana | Beginner | ✅ Basic | 📁 Optional | ✅ Working |
| 6 | Warrior II | Virabhadrasana II | Intermediate | ✅ Enhanced | 📁 Optional | ✅ Working |
| 7 | Triangle Pose | Trikonasana | Intermediate | ✅ Enhanced | 📁 Optional | ✅ Working |
| 8 | Bridge Pose | Setu Bandhasana | Intermediate | ✅ Basic | 📁 Optional | ✅ Working |
| 9 | Cobra Pose | Bhujangasana | Intermediate | ✅ Enhanced | 📁 Optional | ✅ Working |
| 10 | Headstand | Sirsasana | Advanced | ✅ Enhanced | 📁 Optional | ✅ Working |
| 11 | Crow Pose | Bakasana | Advanced | ✅ Basic | 📁 Optional | ✅ Working |
| 12 | Dancer's Pose | Natarajasana | Advanced | ✅ Basic | 📁 Optional | ✅ Working |

---

## Pose Details

### 1. Tadasana (Mountain Pose) 🧍
**Difficulty:** Beginner  
**Procedural Status:** ✅ Enhanced - Standing pose with proper alignment  
**Description:** Perfect starting pose, foundation of all standing poses  
**Model File:** `assets/models/tadasana.glb` (optional)

### 2. Vrikshasana (Tree Pose) 🌳
**Difficulty:** Beginner  
**Procedural Status:** ✅ Enhanced - One leg raised, arms overhead  
**Description:** Balance pose, strengthens legs and core  
**Model File:** `assets/models/vrikshasana.glb` (optional)

### 3. Adho Mukha Svanasana (Downward Dog) 🐕
**Difficulty:** Beginner  
**Procedural Status:** ✅ Enhanced - Inverted V-shape  
**Description:** Full-body stretch, energizing pose  
**Model File:** `assets/models/adho-mukha-svanasana.glb` (optional)

### 4. Balasana (Child's Pose) 🙇
**Difficulty:** Beginner  
**Procedural Status:** ✅ Enhanced - Kneeling, folded forward  
**Description:** Resting pose, calms the mind  
**Model File:** `assets/models/balasana.glb` (optional)

### 5. Sukhasana (Easy Pose) 🧘
**Difficulty:** Beginner  
**Procedural Status:** ✅ Basic - Cross-legged sitting  
**Description:** Meditation pose, opens hips  
**Model File:** `assets/models/sukhasana.glb` (optional)

### 6. Virabhadrasana II (Warrior II) ⚔️
**Difficulty:** Intermediate  
**Procedural Status:** ✅ Enhanced - Wide stance, arms extended  
**Description:** Strengthens legs, opens hips and chest  
**Model File:** `assets/models/virabhadrasana-ii.glb` (optional)

### 7. Trikonasana (Triangle Pose) △
**Difficulty:** Intermediate  
**Procedural Status:** ✅ Enhanced - Side bend with reach  
**Description:** Stretches sides, improves balance  
**Model File:** `assets/models/trikonasana.glb` (optional)

### 8. Setu Bandhasana (Bridge Pose) 🌉
**Difficulty:** Intermediate  
**Procedural Status:** ✅ Basic - Back bend on floor  
**Description:** Opens chest, strengthens back  
**Model File:** `assets/models/setu-bandhasana.glb` (optional)

### 9. Bhujangasana (Cobra Pose) 🐍
**Difficulty:** Intermediate  
**Procedural Status:** ✅ Enhanced - Lying, upper body lifted  
**Description:** Strengthens spine, opens chest  
**Model File:** `assets/models/bhujangasana.glb` (optional)

### 10. Sirsasana (Headstand) 🤸
**Difficulty:** Advanced  
**Procedural Status:** ✅ Enhanced - Fully inverted on head  
**Description:** King of asanas, improves circulation  
**Model File:** `assets/models/sirsasana.glb` (optional)

### 11. Bakasana (Crow Pose) 🦅
**Difficulty:** Advanced  
**Procedural Status:** ✅ Basic - Arm balance  
**Description:** Arm balance, core strength  
**Model File:** `assets/models/bakasana.glb` (optional)

### 12. Natarajasana (Dancer's Pose) 💃
**Difficulty:** Advanced  
**Procedural Status:** ✅ Basic - Standing back bend  
**Description:** Balance and flexibility, graceful  
**Model File:** `assets/models/natarajasana.glb` (optional)

---

## Procedural Pose Quality Levels

### ✅ Enhanced Poses (8 poses)
These have detailed transformations programmed in [3d-viewer.js](yoga-asana-3d/assets/js/3d-viewer.js):
- More realistic body positioning
- Multiple body parts adjusted
- Proper rotations and angles
- Best visual representation

**Includes:**
1. Tadasana
2. Vrikshasana
3. Adho Mukha Svanasana
4. Balasana
5. Virabhadrasana II
6. Trikonasana
7. Bhujangasana
8. Sirsasana

### ✅ Basic Poses (4 poses)
These use simpler transformations:
- Basic positioning
- Fewer adjustments
- Still functional and recognizable
- Could be enhanced in future

**Includes:**
1. Sukhasana
2. Setu Bandhasana
3. Bakasana
4. Natarajasana

---

## How to Enhance Poses

Want to improve a basic pose? Edit [3d-viewer.js](yoga-asana-3d/assets/js/3d-viewer.js):

```javascript
// Find the createProceduralPose() method
// Add a new case in the switch statement:

case 'Sukhasana': // Easy Pose - currently basic
    // Add your transformations here:
    leftUpperLeg.rotation.z = Math.PI / 4;  // Cross legs
    rightUpperLeg.rotation.z = -Math.PI / 4;
    leftArm.position.y = 1.2;  // Rest hands
    rightArm.position.y = 1.2;
    // ... add more details
    break;
```

---

## Adding Real 3D Models

To replace any procedural pose with a real model:

### 1. Find/Create Model
- Download from Sketchfab (https://sketchfab.com)
- Search: "[pose name] yoga"
- Download as GLB format

### 2. Name Correctly
Use the exact name from this table:
```
tadasana.glb
vrikshasana.glb
adho-mukha-svanasana.glb
balasana.glb
sukhasana.glb
virabhadrasana-ii.glb
trikonasana.glb
setu-bandhasana.glb
bhujangasana.glb
sirsasana.glb
bakasana.glb
natarajasana.glb
```

### 3. Place in Folder
```
yoga-asana-3d/assets/models/
    └── [your-model].glb
```

### 4. Refresh Browser
The app automatically:
1. Tries to load the .glb file
2. If found, shows the real model ✅
3. If not found, shows procedural pose ✅
4. **Both work perfectly!**

---

## Database vs. 3D Models

### In Database (MongoDB):
```javascript
{
  name: "Tree Pose",
  sanskritName: "Vrikshasana",
  difficulty: "Beginner",
  modelUrl: "assets/models/vrikshasana.glb",  // ← Reference
  description: "...",
  benefits: [...]
}
```

### 3D Models (Files):
```
assets/models/
    ├── vrikshasana.glb  // ← Actual file (optional)
    └── ... (other poses)
```

### Procedural Code (JavaScript):
```javascript
case 'Vrikshasana':
    // This runs if vrikshasana.glb not found
    leftUpperLeg.rotation.z = Math.PI / 3;
    leftUpperArm.position.y = 2.5;
    rightUpperArm.position.y = 2.5;
    // ... creates pose from code
```

**The beauty:** All three work together seamlessly!

---

## Current Best Practices

### For Beginners:
Use poses 1-5 (all beginner level):
- ✅ Tadasana - Start here
- ✅ Vrikshasana - Balance practice
- ✅ Adho Mukha Svanasana - Full stretch
- ✅ Balasana - Rest pose
- ✅ Sukhasana - Meditation

### For Intermediate:
Progress to poses 6-9:
- ✅ Virabhadrasana II - Strength
- ✅ Trikonasana - Flexibility
- ✅ Setu Bandhasana - Back bending
- ✅ Bhujangasana - Spine strength

### For Advanced:
Challenge with poses 10-12:
- ✅ Sirsasana - Inversions
- ✅ Bakasana - Arm balances
- ✅ Natarajasana - Complex balance

---

## Practice Recommendations

### Daily Practice (20-30 minutes):
1. **Warm-up:** Tadasana → Vrikshasana (5 min)
2. **Main Practice:** Choose 3-4 poses from your level (15 min)
3. **Cool-down:** Balasana → Sukhasana (5-10 min)

### Using the App:
1. Select a pose from dropdown
2. Study the 3D model (rotate, zoom)
3. Click "Start Practice"
4. Hold pose for recommended time
5. Click "Save Session"
6. Track your progress in Dashboard!

---

## Achievement Unlocks

Practice regularly to unlock:
- 🏆 **First Steps** - Complete first session
- 🔥 **Dedicated Yogi** - Practice 3+ times
- 💪 **Consistency Master** - 7-day streak
- ⏱️ **Time Warrior** - 60+ minutes total
- 🎯 **Pose Master** - Master any pose (10 sessions)
- 🌟 **Flexibility Champion** - Master 3+ poses

---

## Quick Stats

```
Total Poses: 12
├── Beginner: 5 poses (42%)
├── Intermediate: 4 poses (33%)
└── Advanced: 3 poses (25%)

Procedural Implementation:
├── Enhanced: 8 poses (67%)
└── Basic: 4 poses (33%)

Real 3D Models:
├── Included: 0 (none needed!)
└── Optional: 12 (can add anytime)

Status: ✅ All poses working perfectly!
```

---

## Next Steps

1. ✅ **Start the app** - See all poses now
2. ✅ **Practice** - Use the timer, track progress
3. ⭐ **Optional:** Add real models later (see [3D_MODELS_GUIDE.md](3D_MODELS_GUIDE.md))
4. 💡 **Enhance:** Improve basic poses in 3d-viewer.js
5. 🎨 **Customize:** Change colors, add features

**All 12 poses are ready to use right now!** 🧘‍♀️✨
