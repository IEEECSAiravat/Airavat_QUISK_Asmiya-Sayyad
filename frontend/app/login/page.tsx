"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { OtpInput } from "@/components/otp-input"

export default function LoginPage() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<"mobile" | "otp">("mobile")
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true)
      setLoginMethod("otp")
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate the OTP here
    if (loginMethod === "otp" && otp.length === 6) {
      router.push("/dashboard")
    } else if (loginMethod === "mobile" && mobileNumber.length === 10) {
      setOtpSent(true)
      setLoginMethod("otp")
    }
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Login Form */}
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
              <h2 className="text-2xl font-bold text-gray-900">Sign In to your account</h2>
              <p className="mt-2 text-sm text-gray-600">Enter your details to sign in</p>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="pl-10"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full bg-teal-700 hover:bg-teal-800"
                  onClick={handleSendOtp}
                  disabled={mobileNumber.length !== 10}
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP sent to {mobileNumber}</Label>
                  <div className="mt-2">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => <Input {...props} className="w-12 h-12 text-center mx-1" />}
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <Button variant="link" className="text-teal-600 p-0 h-auto" onClick={() => setOtpSent(false)}>
                      Change Number
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                      Keep me logged in
                    </Label>
                  </div>
                  <Button variant="link" className="text-teal-600 p-0 h-auto">
                    Resend OTP
                  </Button>
                </div>

                <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800" disabled={otp.length !== 6}>
                  Sign In
                </Button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Button variant="link" className="p-0 h-auto text-teal-600" onClick={handleSignUp}>
                Sign Up
              </Button>
            </p>
          </div>
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
