'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface LeadsStats {
  total: number
  new: number
  redeemed: number
  converted: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<LeadsStats>({
    total: 0,
    new: 0,
    redeemed: 0,
    converted: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/leads')
      if (response.ok) {
        const data = await response.json()
        const leads = data.leads || []
        setStats({
          total: leads.length,
          new: leads.filter((l: any) => l.status === 'new').length,
          redeemed: leads.filter((l: any) => l.status === 'redeemed').length,
          converted: leads.filter((l: any) => l.status === 'converted').length,
        })
      }
    } catch (error) {
      console.error('[v0] Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Dabbawala" width={40} height={40} className="rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-primary-foreground/80">Dabbawala India Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, icon: '👥' },
            { label: 'New Leads', value: stats.new, icon: '✨' },
            { label: 'Coupons Redeemed', value: stats.redeemed, icon: '🎟️' },
            { label: 'Converted', value: stats.converted, icon: '✅' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-foreground/60 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex gap-4 border-b border-border overflow-x-auto">
          {[
            { id: 'leads', label: '📋 Leads Management' },
            { id: 'plans', label: '💰 Plans Management' },
            { id: 'specials', label: '🍽️ Weekly Specials' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl border border-border p-6"
        >
          {activeTab === 'leads' && <LeadsTab onDataChange={fetchStats} />}
          {activeTab === 'plans' && <PlansTab />}
          {activeTab === 'specials' && <SpecialsTab />}
        </motion.div>
      </div>
    </div>
  )
}

// Leads Tab Component
function LeadsTab({ onDataChange }: { onDataChange: () => void }) {
  const [leads, setLeads] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    try {
      const url = filter === 'all' ? '/api/admin/leads' : `/api/admin/leads?status=${filter}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
      }
    } catch (error) {
      console.error('[v0] Error fetching leads:', error)
    }
  }

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status }),
      })
      if (response.ok) {
        fetchLeads()
        onDataChange()
      }
    } catch (error) {
      console.error('[v0] Error updating lead:', error)
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-4">
        {['all', 'new', 'redeemed', 'converted'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === f ? 'bg-secondary text-white' : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Mobile</th>
              <th className="text-left py-3 px-4">Area</th>
              <th className="text-left py-3 px-4">Coupon Code</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-border hover:bg-muted/30 transition">
                <td className="py-3 px-4">{lead.name}</td>
                <td className="py-3 px-4">{lead.mobile}</td>
                <td className="py-3 px-4">{lead.area}</td>
                <td className="py-3 px-4 font-mono font-semibold text-secondary">{lead.couponCode}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lead.status === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : lead.status === 'redeemed'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {lead.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                    defaultValue={lead.status}
                    className="px-2 py-1 border border-border rounded text-xs"
                  >
                    <option value="new">New</option>
                    <option value="redeemed">Redeemed</option>
                    <option value="converted">Converted</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Plans Tab Component
function PlansTab() {
  const [plans, setPlans] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
      }
    } catch (error) {
      console.error('[v0] Error fetching plans:', error)
    }
  }

  const deletePlan = async (planId: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      try {
        await fetch(`/api/admin/plans?id=${planId}`, { method: 'DELETE' })
        fetchPlans()
      } catch (error) {
        console.error('[v0] Error deleting plan:', error)
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition"
        >
          {showForm ? '✕ Cancel' : '+ Add New Plan'}
        </button>
      </div>

      {showForm && <PlanForm onSuccess={() => { fetchPlans(); setShowForm(false) }} />}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="border border-border rounded-lg p-4 hover:shadow-md transition">
            <h3 className="text-lg font-bold text-primary mb-2">{plan.title}</h3>
            <p className="text-2xl font-bold text-secondary mb-4">₹{plan.price}</p>
            <p className="text-sm text-foreground/60 mb-4">{plan.meals} meals</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border border-secondary text-secondary rounded text-sm hover:bg-secondary/10 transition">
                Edit
              </button>
              <button
                onClick={() => deletePlan(plan._id)}
                className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Plan Form Component
function PlanForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    meals: '',
    features: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const features = formData.features.split('\n').filter((f) => f.trim())
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          price: parseInt(formData.price),
          meals: parseInt(formData.meals),
          features,
        }),
      })
      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('[v0] Error creating plan:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-muted/30 p-6 rounded-lg mb-6 space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Plan Title"
        required
        className="w-full px-4 py-2 border border-border rounded-lg"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (₹)"
        required
        className="w-full px-4 py-2 border border-border rounded-lg"
      />
      <input
        type="number"
        name="meals"
        value={formData.meals}
        onChange={handleChange}
        placeholder="Number of Meals"
        required
        className="w-full px-4 py-2 border border-border rounded-lg"
      />
      <textarea
        name="features"
        value={formData.features}
        onChange={handleChange}
        placeholder="Features (one per line)"
        rows={4}
        className="w-full px-4 py-2 border border-border rounded-lg resize-none"
      />
      <button type="submit" className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition">
        Add Plan
      </button>
    </form>
  )
}

// Specials Tab Component
function SpecialsTab() {
  const [specials, setSpecials] = useState<any[]>([])

  useEffect(() => {
    fetchSpecials()
  }, [])

  const fetchSpecials = async () => {
    try {
      const response = await fetch('/api/admin/specials')
      if (response.ok) {
        const data = await response.json()
        setSpecials(data.specials || [])
      }
    } catch (error) {
      console.error('[v0] Error fetching specials:', error)
    }
  }

  return (
    <div>
      <p className="text-foreground/60">Weekly specials management coming soon...</p>
      <div className="mt-4 space-y-2">
        {specials.map((special) => (
          <div key={special._id} className="p-4 border border-border rounded-lg">
            <h4 className="font-semibold text-primary">{special.day}: {special.name}</h4>
            <p className="text-sm text-foreground/60">{special.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
