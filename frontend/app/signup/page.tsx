"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { OtpInput } from "@/components/otp-input"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<"details" | "otp" | "profile">("details")
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleOtpChange = (value: string) => {
    setFormData((prev) => ({ ...prev, otp: value }))
  }

  const handleSendOtp = () => {
    if (formData.name && formData.mobile.length === 10 && formData.agreeToTerms) {
      setStep("otp")
    }
  }

  const handleVerifyOtp = () => {
    if (formData.otp.length === 6) {
      setStep("profile")
    }
  }

  const handleCompleteSignup = () => {
    router.push("/dashboard")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Signup Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white font-semibold">SK</span>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">SkillSakhi</h1>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">Join SkillSakhi to start your learning journey</p>
            </div>
          </div>

          {step === "details" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="pl-10"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <Button variant="link" className="p-0 h-auto text-teal-600">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 h-auto text-teal-600">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <Button
                  type="button"
                  className="w-full bg-teal-700 hover:bg-teal-800"
                  onClick={handleSendOtp}
                  disabled={!formData.name || formData.mobile.length !== 10 || !formData.agreeToTerms}
                >
                  Continue
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-teal-600" onClick={handleLogin}>
                    Sign In
                  </Button>
                </p>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP sent to {formData.mobile}</Label>
                  <div className="mt-2">
                    <OtpInput
                      value={formData.otp}
                      onChange={handleOtpChange}
                      numInputs={6}
                      renderInput={(props) => <Input {...props} className="w-12 h-12 text-center mx-1" />}
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <Button variant="link" className="text-teal-600 p-0 h-auto" onClick={() => setStep("details")}>
                      Change Number
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <Button variant="link" className="text-teal-600 p-0 h-auto">
                    Resend OTP
                  </Button>
                </div>

                <Button
                  type="button"
                  className="w-full bg-teal-700 hover:bg-teal-800"
                  onClick={handleVerifyOtp}
                  disabled={formData.otp.length !== 6}
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          )}

          {step === "profile" && (
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <Button variant="link" className="mt-2 text-teal-600">
                    Upload Profile Picture
                  </Button>
                </div>

                <div>
                  <Label htmlFor="education">Highest Education</Label>
                  <Input
                    id="education"
                    type="text"
                    placeholder="e.g., Bachelor's in Computer Science"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Input
                    id="interests"
                    type="text"
                    placeholder="e.g., Web Development, Data Science"
                    className="mt-1"
                  />
                </div>

                <Button type="button" className="w-full bg-teal-700 hover:bg-teal-800" onClick={handleCompleteSignup}>
                  Complete Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 bg-teal-800">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="max-w-md space-y-8">
            <h2 className="text-3xl font-bold">Kick-Start Your Career With Our Industry Leading Courses</h2>
            <p className="text-teal-100">
              Start your new career today with our selection of accredited skilling courses. Learn from real-world-class
              course content, engage with our expert tutor team, and enter the industry immediately with our work
              guarantee.
            </p>

            <div className="flex justify-center space-x-2 pt-4">
              <div className="h-2 w-2 rounded-full bg-white opacity-100"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
