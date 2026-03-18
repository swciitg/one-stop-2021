import TravelGuide from "../models/travelGuideModel.js";
import asyncHandler from "../middlewares/async.controllers.handler.js";

export const getAllTravelGuides = asyncHandler(async (req, res) => {
  const guides = await TravelGuide.find().sort({ place: 1 });
  res.json({ success: true, data: guides });
});

export const getTravelGuideById = asyncHandler(async (req, res) => {
  const guide = await TravelGuide.findById(req.params.id);
  if (!guide) {
    return res.status(404).json({ success: false, message: "Travel guide not found" });
  }
  res.json({ success: true, data: guide });
});

export const createTravelGuide = asyncHandler(async (req, res) => {
  const guide = new TravelGuide(req.body);
  await guide.save();
  res.status(201).json({ success: true, data: guide });
});

export const updateTravelGuide = asyncHandler(async (req, res) => {
  const guide = await TravelGuide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!guide) {
    return res.status(404).json({ success: false, message: "Travel guide not found" });
  }
  res.json({ success: true, data: guide });
});

export const deleteTravelGuide = asyncHandler(async (req, res) => {
  const guide = await TravelGuide.findByIdAndDelete(req.params.id);
  if (!guide) {
    return res.status(404).json({ success: false, message: "Travel guide not found" });
  }
  res.json({ success: true, message: "Travel guide deleted" });
});
