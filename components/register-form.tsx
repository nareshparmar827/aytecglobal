"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronLeft, Upload, CheckCircle } from "lucide-react"

interface FormData {
  // Step 1: Business Information
  companyName: string
  website: string
  companyRegNo: string
  vatNo: string
  eoriNo: string
  incorporationDate: string
  addressLine1: string
  addressLine2: string
  city: string
  postCode: string
  country: string
  documents: File | null

  // Step 2: Contact Information
  accountsFirstName: string
  accountsLastName: string
  salesFirstName: string
  salesLastName: string
  accountsEmail: string
  salesEmail: string
  accountsPhone: string
  salesPhone: string

  // Step 3: Banking Details
  bankName: string
  yearsWithBank: string
  accountName: string
  accountNo: string
  sortCode: string
  iban: string
  swift: string

  // Step 4: Trade References
  ref1Company: string
  ref2Company: string
  ref1Email: string
  ref2Email: string
  ref1Phone: string
  ref2Phone: string
  ref1City: string
  ref2City: string

  // Step 5: Comments
  comments: string
}

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    website: "",
    companyRegNo: "",
    vatNo: "",
    eoriNo: "",
    incorporationDate: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postCode: "",
    country: "UK",
    documents: null,
    accountsFirstName: "",
    accountsLastName: "",
    salesFirstName: "",
    salesLastName: "",
    accountsEmail: "",
    salesEmail: "",
    accountsPhone: "",
    salesPhone: "",
    bankName: "",
    yearsWithBank: "",
    accountName: "",
    accountNo: "",
    sortCode: "",
    iban: "",
    swift: "",
    ref1Company: "",
    ref2Company: "",
    ref1Email: "",
    ref2Email: "",
    ref1Phone: "",
    ref2Phone: "",
    ref1City: "",
    ref2City: "",
    comments: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, documents: e.target.files![0] }))
    }
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section ref={ref} className="py-16 sm:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? "slide-up" : "opacity-0 translate-y-10"}`}>
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                Thank You for Submitting Your Application
              </h1>
              <p className="text-lg text-foreground/70 mb-8 text-balance">
                We will process your submission within 2 business days.
              </p>
              <p className="text-foreground/60 mb-8">
                Our team will review your information and contact you shortly with next steps.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setCurrentStep(1)
                }}
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "slide-up" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2 text-balance">
            Register Trade Account
          </h1>
          <p className="text-center text-foreground/70 mb-12">
            Complete the form below to register your trade account with Aytec Global
          </p>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                      step <= currentStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/70 text-center">
                    {step === 1 && "Business"}
                    {step === 2 && "Contact"}
                    {step === 3 && "Banking"}
                    {step === 4 && "References"}
                    {step === 5 && "Comments"}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Business Information</h2>
                  <p className="text-foreground/70 mb-6">Tell us about your company</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Company / Trading Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Website Address</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Reg No.</label>
                    <input
                      type="text"
                      name="companyRegNo"
                      value={formData.companyRegNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Registration number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">VAT No.</label>
                    <input
                      type="text"
                      name="vatNo"
                      value={formData.vatNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="VAT number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">EORI No.</label>
                    <input
                      type="text"
                      name="eoriNo"
                      value={formData.eoriNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="EORI number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Incorporation Date</label>
                    <input
                      type="date"
                      name="incorporationDate"
                      value={formData.incorporationDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Registered Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Address Line 1 *</label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Street address"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Address Line 2</label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Post / Zip Code *</label>
                      <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Postal code"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="EU">European Union</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Documents (Company Formation / VAT Certification)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-foreground font-medium">
                        {formData.documents ? formData.documents.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-foreground/70 text-sm">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
                  <p className="text-foreground/70 mb-6">Contact info for accounts and purchases</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Accounts Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        name="accountsFirstName"
                        value={formData.accountsFirstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="First name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="accountsLastName"
                        value={formData.accountsLastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Last name"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="accountsEmail"
                        value={formData.accountsEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        name="accountsPhone"
                        value={formData.accountsPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="+44 (0) 123 456 7890"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Sales Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        name="salesFirstName"
                        value={formData.salesFirstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="First name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="salesLastName"
                        value={formData.salesLastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Last name"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="salesEmail"
                        value={formData.salesEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        name="salesPhone"
                        value={formData.salesPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="+44 (0) 123 456 7890"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Banking Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Banking Details</h2>
                  <p className="text-foreground/70 mb-6">Your preferred banking partner</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name of your Bank *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Bank name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Number of years with your bank? *
                    </label>
                    <select
                      name="yearsWithBank"
                      value={formData.yearsWithBank}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    >
                      <option value="">- Select -</option>
                      <option value="under1">Under 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5plus">5+ years</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Account Name *</label>
                    <input
                      type="text"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Account name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Account No. *</label>
                    <input
                      type="text"
                      name="accountNo"
                      value={formData.accountNo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Account number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sort Code *</label>
                    <input
                      type="text"
                      name="sortCode"
                      value={formData.sortCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="XX-XX-XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">IBAN</label>
                    <input
                      type="text"
                      name="iban"
                      value={formData.iban}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="IBAN"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Swift / BIC</label>
                    <input
                      type="text"
                      name="swift"
                      value={formData.swift}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                      placeholder="Swift / BIC code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Trade References */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Trade References</h2>
                  <p className="text-foreground/70 mb-6">Please share a couple of references to whom we can contact</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Trade Reference 1</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="ref1Company"
                        value={formData.ref1Company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="ref1Email"
                        value={formData.ref1Email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone/Mobile *</label>
                      <input
                        type="tel"
                        name="ref1Phone"
                        value={formData.ref1Phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="+44 (0) 123 456 7890"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="ref1City"
                        value={formData.ref1City}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Trade Reference 2</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="ref2Company"
                        value={formData.ref2Company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="ref2Email"
                        value={formData.ref2Email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone/Mobile *</label>
                      <input
                        type="tel"
                        name="ref2Phone"
                        value={formData.ref2Phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="+44 (0) 123 456 7890"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="ref2City"
                        value={formData.ref2City}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Comments */}
            {currentStep === 4 && (
              <div className="space-y-6 p-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Anything else / Comments?</h2>
                  <p className="text-foreground/70 mb-6">Let us know if there's anything else we should know</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground resize-none"
                    placeholder="Any additional comments or requests..."
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-8 pt-8 border-t border-border">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep === 4 ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Submit Form
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}