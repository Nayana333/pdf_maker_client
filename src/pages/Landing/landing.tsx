import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import './Landing.css'

const FlagIcon = ({ country }: { country: string }) => {
  switch (country) {
    case 'India':
      return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="5" fill="#FF9933"/>
          <rect y="5" width="20" height="5" fill="#FFFFFF"/>
          <rect y="10" width="20" height="5" fill="#138808"/>
          <circle cx="10" cy="7.5" r="1.5" fill="#000080"/>
        </svg>
      )
    case 'United States':
      return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="15" fill="#BD3D44"/>
          <rect y="1.15385" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect y="3.46154" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect y="5.76923" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect y="8.07692" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect y="10.3846" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect y="12.6923" width="20" height="1.15385" fill="#FFFFFF"/>
          <rect width="10" height="8.07692" fill="#192F5D"/>
        </svg>
      )
    case 'Germany':
      return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="5" fill="#000000"/>
          <rect y="5" width="20" height="5" fill="#DD0000"/>
          <rect y="10" width="20" height="5" fill="#FFCE00"/>
        </svg>
      )
    case 'China':
      return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="15" fill="#DE2910"/>
          <path d="M2 2L3.5 5L1 3.5H3L0.5 5L2 2Z" fill="#FFDE00"/>
          <path d="M6 1L6.5 2.5L5 1.5H7L5.5 2.5L6 1Z" fill="#FFDE00"/>
          <path d="M8 3L8.5 4.5L7 3.5H9L7.5 4.5L8 3Z" fill="#FFDE00"/>
          <path d="M8 6L8.5 7.5L7 6.5H9L7.5 7.5L8 6Z" fill="#FFDE00"/>
          <path d="M6 8L6.5 9.5L5 8.5H7L5.5 9.5L6 8Z" fill="#FFDE00"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Component() {
  return (
    <div className="landing">
    <div className="grid gap-4 max-w-[700px] bg-[#DCDCDC] ">
      <Card className="p-6 rounded-xl">
        <div className="space-y-1">
          <p className="text-sm text-[#6B7280]">Gross Revenue</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">$2,480</span>
            <span className="text-sm text-[#6B7280]">.32</span>
            <div className="flex items-center text-xs text-[#10B981] font-medium">
              <TrendingUp className="w-3 h-3" />
              2,15%
            </div>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-2">From Jan 01, 2024 - March 30, 2024</p>
      </Card>

      <Card className="p-6 rounded-xl">
        <div className="space-y-1">
          <p className="text-sm text-[#6B7280]">Avg. Order Value</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">$56</span>
            <span className="text-sm text-[#6B7280]">.12</span>
            <div className="flex items-center text-xs text-[#EF4444] font-medium">
              <TrendingDown className="w-3 h-3" />
              2,15%
            </div>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-2">From Jan 01, 2024 - March 30, 2024</p>
      </Card>

      <Card className="p-6 rounded-xl">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#6B7280]">Active user in countries</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold">7,269</span>
              <div className="flex items-center text-xs text-[#10B981] font-medium">
                <TrendingUp className="w-3 h-3" />
                8,72%
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">User updated 972 this week</p>
          </div>

          <div className="space-y-4">
            {[
              { country: 'India', percentage: 72 },
              { country: 'United States', percentage: 65 },
              { country: 'Germany', percentage: 42 },
              { country: 'China', percentage: 85 },
            ].map((item) => (
              <div key={item.country} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FlagIcon country={item.country} />
                    {item.country}
                  </div>
                  <span>{item.percentage}%</span>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9199aa] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
    </div>
  )
} 