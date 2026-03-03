# 🎨 3D Yoga Models Guide

## Current Status

Your 3D viewer is set up with **TWO systems**:

### 1. ✅ Procedural Models (Currently Active)
- Created using Three.js geometric shapes
- No external files needed
- Provides basic pose visualization
- Works immediately

### 2. ✅ GLTF/GLB Model Loader (Ready to Use)
- Can load professional 3D models
- Supports .glb and .gltf formats
- Better visual quality
- Requires model files

---

## 🆓 Where to Get FREE 3D Yoga Models

### Option 1: Free 3D Model Websites

#### **Sketchfab** (Best for Yoga Poses)
- Website: https://sketchfab.com
- Search: "yoga pose" or "yoga asana"
- Filter: "Downloadable" + "Free"
- Format: Download as GLB or GLTF
- License: Check for CC licenses that allow use

**Example searches:**
- "tree pose"
- "warrior pose"
- "downward dog"
- "yoga meditation"

#### **TurboSquid Free Models**
- Website: https://turbosquid.com/Search/3D-Models/free/yoga
- Filter by: Free models
- Download format: GLB or FBX (convert to GLB)

#### **CGTrader Free Section**
- Website: https://cgtrader.com/free-3d-models/yoga
- Look for: Royalty-free models
- Download: GLB or GLTF format

#### **Free3D**
- Website: https://free3d.com
- Search: "yoga" or "human pose"
- Download: GLB format preferred

#### **Mixamo** (Best for Rigged Characters)
- Website: https://mixamo.com (by Adobe - FREE!)
- Features: Pre-rigged characters, animations
- Process:
  1. Select a character
  2. Download as FBX
  3. Convert to GLB using online converter
- Great for: Creating custom yoga poses with rigging

### Option 2: Create Your Own

#### **Blender** (Free 3D Software)
- Website: https://blender.org
- Features:
  - Professional 3D modeling
  - Rigging and posing tools
  - Export to GLB/GLTF
- Tutorials for yoga poses:
  - YouTube: "Blender human pose tutorial"
  - Blender Artists forum

#### **MakeHuman** (Free Character Creator)
- Website: http://makehuman.org
- Features:
  - Easy human character creation
  - Pose tool included
  - Export to many formats
- Perfect for: Creating base yoga characters

---

## 📥 How to Add 3D Models to Your Project

### Step 1: Download a Model
1. Find a free yoga pose model (see above)
2. Download in GLB or GLTF format
3. If not GLB/GLTF, convert using: https://products.aspose.app/3d/conversion

### Step 2: Add to Your Project
```bash
# Place the model in this folder:
yoga-asana-3d/assets/models/

# Example structure:
yoga-asana-3d/assets/models/
    ├── tree-pose.glb
    ├── warrior-pose.glb
    ├── downward-dog.glb
    └── meditation.glb
```

### Step 3: Update Database (Optional)
Edit `yoga-backend/seed.js` and update the `modelUrl` fields:

```javascript
{
  name: 'Vrikshasana',
  sanskritName: 'Tree Pose',
  difficulty: 'Beginner',
  modelUrl: 'assets/models/tree-pose.glb'  // ← Update this
}
```

### Step 4: The Viewer Automatically Uses Real Models!
The viewer will:
1. Try to load the 3D model file
2. If it fails, fall back to procedural pose
3. No code changes needed!

---

## 🔄 Converting Other Formats to GLB

If you have models in other formats (FBX, OBJ, STL, etc.):

### Online Converters (Easiest):
1. **Aspose 3D Converter**
   - https://products.aspose.app/3d/conversion
   - Upload any 3D format → Convert to GLB

2. **AnyConv**
   - https://anyconv.com/3d-converter
   - Simple drag & drop

3. **Blender** (Best Quality):
   ```
   1. Open Blender
   2. File → Import → [Your Format]
   3. File → Export → glTF 2.0 (.glb)
   4. Export settings: Check "Y Up"
   ```

---

## 🎯 Recommended Models for Each Pose

### Beginner Poses:
- **Tadasana** (Mountain): Standing character, arms at sides
- **Vrikshasana** (Tree): One leg up, hands in prayer
- **Balasana** (Child's Pose): Kneeling, folded forward
- **Sukhasana** (Easy Pose): Sitting cross-legged

### Intermediate Poses:
- **Virabhadrasana II** (Warrior II): Wide stance, arms extended
- **Trikonasana** (Triangle): Side bend with reach
- **Bhujangasana** (Cobra): Lying, upper body lifted

### Advanced Poses:
- **Sirsasana** (Headstand): Inverted, on head
- **Bakasana** (Crow): Arm balance
- **Natarajasana** (Dancer): Standing back bend

---

## 🆓 Specific Free Model Recommendations

### Ready-to-Use Free Models:

1. **Mixamo Characters** (Best Choice!)
   - URL: https://mixamo.com
   - Login: Free Adobe account
   - Characters: Y Bot, X Bot (simple, professional)
   - Process:
     ```
     1. Select "Y Bot" character
     2. Click "Download"
     3. Format: FBX for Unity (.fbx)
     4. Skin: With Skin
     5. Convert FBX to GLB online
     ```
   - Result: Professional, rigged character you can pose

2. **Sketchfab Collections**:
   - Search: "yoga CC0" (free commercial use)
   - Look for models with "Download" button
   - Example: https://sketchfab.com/search?q=yoga%20pose&type=models&features=downloadable

3. **Human Generator** (Free Basic Models)
   - Website: https://human-generator.com
   - Features: Basic free human poses
   - Export: GLB format

---

## 🚀 Quick Test with Sample Model

Want to test immediately? Use this free pose:

1. **Go to Sketchfab**
   - https://sketchfab.com/3d-models/meditation-pose-b6c8c3f4f0b64fd9a6e6c8c0e0f8c9c9

2. **Download**:
   - Click "Download 3D Model"
   - Format: "glTF" (automatic)
   - Save as: `meditation.glb`

3. **Place in**:
   ```
   yoga-asana-3d/assets/models/meditation.glb
   ```

4. **Test**: The viewer will automatically load it!

---

## 💡 Creating a Complete Set

### Budget: $0 (All Free!)
1. Use **Mixamo** base character (Y Bot)
2. Find 12 different poses on **Sketchfab** (free/CC0)
3. Convert all to GLB
4. Name them correctly:
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

### Time Required: 2-3 hours

---

## 🛠️ Advanced: Creating Custom Poses in Blender

If you want perfect poses:

### Quick Tutorial:
1. **Install Blender** (https://blender.org)
2. **Add Human Model**:
   - Use MakeHuman to create character
   - Or download rigged model from Mixamo
3. **Pose the Character**:
   - Enter "Pose Mode" (Ctrl+Tab)
   - Select bones, rotate to desired positions
4. **Export**:
   - File → Export → glTF 2.0 (.glb)
   - Select "Limit to Selected Objects"
   - Export!

### YouTube Tutorials:
- "Blender rigging tutorial for beginners"
- "How to pose a character in Blender"
- "Blender yoga pose animation"

---

## 🎨 Model Quality Guidelines

### Good Model Characteristics:
- ✅ Low poly count (< 50k polygons) for web
- ✅ Clean geometry
- ✅ Proper scale (around 1.5-2 units tall)
- ✅ Centered at origin
- ✅ GLB format (single file)

### Avoid:
- ❌ Extremely high poly models (slow loading)
- ❌ Multiple textures (increases file size)
- ❌ Rigged models with complex skeletons (if static pose)

---

## 📊 File Size Recommendations

- **Per model**: 500 KB - 5 MB
- **Total for 12 poses**: < 30 MB
- **Optimization**: Use [gltf.report](https://gltf.report) to analyze and optimize

---

## ❓ FAQ

### Q: Can I use models from X website?
**A**: Check the license! Look for:
- CC0 (Public Domain)
- CC-BY (Credit required)
- Royalty-free
- Personal & Commercial use allowed

### Q: My model loads but looks weird
**A**: Try:
1. Check scale (might be too big/small)
2. Check orientation (might be rotated wrong)
3. Re-export with "Y up" setting

### Q: Models load slowly
**A**: Optimize using:
- https://gltf.report (analyzer)
- https://glb-packer.glitch.me (compressor)
- Reduce textures to 1024x1024

### Q: Can I mix procedural and real models?
**A**: Yes! The system automatically:
- Uses real model if file exists
- Falls back to procedural if not found

---

## 🎉 Summary

**To get started with 3D models:**

1. **Easiest**: Use Mixamo (free, professional)
2. **Most Variety**: Browse Sketchfab with CC0 filter
3. **Custom Poses**: Learn Blender (2-3 hours of tutorials)
4. **Right Now**: Download any free model and test!

**Your viewer is already set up to handle both systems!**

---

**Need help? Issues? The viewer will show helpful console messages when trying to load models.**
