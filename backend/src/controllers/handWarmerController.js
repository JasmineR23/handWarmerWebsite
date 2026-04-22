import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// -----------------------------
// CREATE HAND WARMER (with image upload)
// -----------------------------
export const createHandWarmer = async (req, res) => {
  try {
    // Multer gives us the uploaded file
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // The rest of the data comes as JSON inside "data"
    const parsedData = JSON.parse(req.body.data);

    const {
      hand_warmer_name,
      hand_warmer_quantity,
      hand_warmers_ordered,
      hand_warmer_desc,
      hand_warmer_style,
      hand_warmer_materials
    } = parsedData;

    // Create the hand warmer
    const newHandWarmer = await prisma.handWarmer.create({
      data: {
        name: hand_warmer_name,
        quantity: hand_warmer_quantity,
        ordered: hand_warmers_ordered,
        image: imageFile.filename, // ⭐ Save filename
        description: hand_warmer_desc,
        style: hand_warmer_style
      }
    });

    // Create materials + distribution
    for (const mat of hand_warmer_materials) {
      const createdMaterial = await prisma.handWarmerMaterial.create({
        data: {
          colour: mat.colour,
          handWarmerId: newHandWarmer.id
        }
      });

      for (const dist of mat.distribution) {
        await prisma.materialDistribution.create({
          data: {
            material: dist.material,
            percent: dist.percent,
            materialId: createdMaterial.id
          }
        });
      }
    }

    res.status(201).json({
      message: "Hand warmer created successfully",
      handWarmer: newHandWarmer
    });

  } catch (error) {
    console.error("Error creating hand warmer:", error);
    res.status(500).json({ error: "Failed to create hand warmer" });
  }
};

// -----------------------------
// GET ALL HAND WARMERS
// -----------------------------
export const getAllHandWarmers = async (req, res) => {
  try {
    const handWarmers = await prisma.handWarmer.findMany({
      include: {
        materialDetails: {
          include: {
            distribution: true
          }
        }
      }
    });

    res.json(handWarmers);

  } catch (error) {
    console.error("Error fetching hand warmers:", error);
    res.status(500).json({ error: "Failed to fetch hand warmers" });
  }
};

// -----------------------------
// GET ONE HAND WARMER
// -----------------------------
export const getHandWarmerById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const handWarmer = await prisma.handWarmer.findUnique({
      where: { id },
      include: {
        materialDetails: {
          include: {
            distribution: true
          }
        }
      }
    });

    if (!handWarmer) {
      return res.status(404).json({ error: "Hand warmer not found" });
    }

    res.json(handWarmer);

  } catch (error) {
    console.error("Error fetching hand warmer:", error);
    res.status(500).json({ error: "Failed to fetch hand warmer" });
  }
};

// -----------------------------
// DELETE HAND WARMER
// -----------------------------
export const deleteHandWarmer = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.handWarmer.delete({
      where: { id }
    });

    res.json({ message: "Hand warmer deleted successfully" });

  } catch (error) {
    console.error("Error deleting hand warmer:", error);
    res.status(500).json({ error: "Failed to delete hand warmer" });
  }
};
