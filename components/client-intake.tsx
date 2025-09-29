"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ClientIntakeProps {
  onNext?: () => void
}

export function ClientIntake({ onNext }: ClientIntakeProps) {
  const [formData, setFormData] = useState({
    businessName: "TechFlow Solutions Inc.",
    naicsOperations: "541511 - Custom Computer Programming Services",
    states: "CA, NY, TX",
    locations: "3",
    headcount: "45",
    revenuePayroll: "$8,500,000 annual revenue",
    priorPolicies:
      "Current GL policy with Hartford ($1M/$2M limits), Property coverage with Travelers ($2M TIV), Cyber policy with AIG ($1M limit). No recent claims in past 3 years.",
    desiredLimits:
      "General Liability: $2M/$4M, Property: $3M TIV with $5K deductible, Cyber: $2M limit, Professional Liability: $1M/$3M, Employment Practices: $1M",
    primaryContact: "Sarah Johnson, Risk Manager\nsarah.johnson@techflow.com\n(555) 123-4567",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Enter business name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="naicsOperations">NAICS/Operations</Label>
              <Input
                id="naicsOperations"
                value={formData.naicsOperations}
                onChange={(e) => handleInputChange("naicsOperations", e.target.value)}
                placeholder="e.g., 541511 - Custom Computer Programming"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="states">States</Label>
              <Input
                id="states"
                value={formData.states}
                onChange={(e) => handleInputChange("states", e.target.value)}
                placeholder="e.g., CA, NY, TX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="locations">Locations</Label>
              <Input
                id="locations"
                value={formData.locations}
                onChange={(e) => handleInputChange("locations", e.target.value)}
                placeholder="Number of locations"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="headcount">Headcount</Label>
              <Input
                id="headcount"
                value={formData.headcount}
                onChange={(e) => handleInputChange("headcount", e.target.value)}
                placeholder="Number of employees"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="revenuePayroll">Revenue/Payroll</Label>
              <Input
                id="revenuePayroll"
                value={formData.revenuePayroll}
                onChange={(e) => handleInputChange("revenuePayroll", e.target.value)}
                placeholder="Annual revenue or payroll"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="priorPolicies">Prior Policies</Label>
              <Textarea
                id="priorPolicies"
                value={formData.priorPolicies}
                onChange={(e) => handleInputChange("priorPolicies", e.target.value)}
                placeholder="Describe current or prior insurance policies"
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Coverage Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="desiredLimits">Desired Limits/Deductibles</Label>
                <Textarea
                  id="desiredLimits"
                  value={formData.desiredLimits}
                  onChange={(e) => handleInputChange("desiredLimits", e.target.value)}
                  placeholder="Specify desired coverage limits and deductibles"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="primaryContact">Primary Contact</Label>
                <Textarea
                  id="primaryContact"
                  value={formData.primaryContact}
                  onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                  placeholder="Name, title, email, phone"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" className="bg-transparent">
          Save Draft
        </Button>
        <Button onClick={() => onNext?.()}>Next: Upload & Preview</Button>
      </div>
    </div>
  )
}
