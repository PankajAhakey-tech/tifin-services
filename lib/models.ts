import mongoose from 'mongoose'

// Lead Schema
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    couponCode: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['new', 'redeemed', 'converted'], default: 'new' },
  },
  { timestamps: true }
)

// Plan Schema
const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    meals: { type: Number, required: true },
    features: [String],
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
)

// Weekly Special Schema
const weeklySpecialSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
)

// Admin User Schema
const adminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export const getModels = () => ({
  Lead: mongoose.models.Lead || mongoose.model('Lead', leadSchema),
  Plan: mongoose.models.Plan || mongoose.model('Plan', planSchema),
  WeeklySpecial: mongoose.models.WeeklySpecial || mongoose.model('WeeklySpecial', weeklySpecialSchema),
  AdminUser: mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema),
})

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema)
export const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema)
export const WeeklySpecial = mongoose.models.WeeklySpecial || mongoose.model('WeeklySpecial', weeklySpecialSchema)
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema)
