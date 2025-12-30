const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalContent: {
      type: String,
      required: true,
    },

    updatedContent: {
      type: String,
      default: "",
    },

    sourceUrl: {
      type: String,
      required: true,
    },

    referenceUrls: {
      type: [String],
      default: [],
    },

    isUpdated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
