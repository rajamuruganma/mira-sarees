'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Upload } from 'lucide-react'
import { PRICE_FORMATTER } from '@/lib/constants'

const FABRICS = [
  { name: 'Pure Silk', price: 15000, img: '/images/sarees/banarasi-red.png' },
  { name: 'Georgette', price: 8000, img: '/images/sarees/kanjivaram-purple.png' },
  { name: 'Chiffon', price: 6000, img: '/images/sarees/chanderi-green.png' },
  { name: 'Cotton Linen', price: 4500, img: '/images/sarees/festive-orange.png' },
  { name: 'Mira Blend', price: 12000, img: '/images/sarees/bridal-gold.png' },
]

const COLORS = [
  '#C41E3A', '#8B2635', '#DC143C', '#FF6347', '#FF8243', '#C9A84C',
  '#E8D08A', '#FFD700', '#50C878', '#87AE73', '#008080', '#4B0082',
  '#191970', '#000080', '#7B68EE', '#DA70D6', '#FF69B4', '#E8A0BF',
  '#FAF0E6', '#F5EDE3', '#C0C0C0', '#808080', '#800020', '#B76E79',
  '#FFDAB9', '#FFD1DC', '#B7410E', '#CFB53B', '#000000', '#FFFFFF',
]

const PATTERNS = ['Paisley', 'Temple Border', 'Floral', 'Geometric', 'Modern Abstract', 'Peacock', 'Elephant', 'Mango Motif']
const BORDER_WIDTHS = ['Thin', 'Medium', 'Broad', 'Grand']
const ZARI_TYPES = ['Gold Zari', 'Silver Zari', 'Antique Zari', 'Copper Zari', 'None']
const BLOUSE_STYLES = ['Round Neck', 'V-Neck', 'Boat Neck', 'Princess Cut', 'Halter', 'Backless', 'Collar', 'Square Neck']
const EMBELLISHMENTS = ['Sequins', 'Mirror Work', 'Stone Work', 'Thread Embroidery', 'None']

const EMBELLISHMENT_PRICES: Record<string, number> = {
  Sequins: 2000, 'Mirror Work': 3500, 'Stone Work': 4000, 'Thread Embroidery': 5000, None: 0,
}

export default function CustomizePage() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    fabric: '', color: '', pattern: '', borderWidth: '', zariType: '',
    blouseStyle: '', embellishments: [] as string[], notes: '',
  })

  const totalSteps = 7
  const fabricObj = FABRICS.find((f) => f.name === selections.fabric)
  const basePrice = fabricObj?.price || 0
  const embellishmentCost = selections.embellishments.reduce(
    (sum, e) => sum + (EMBELLISHMENT_PRICES[e] || 0), 0
  )
  const estimatedPrice = basePrice + embellishmentCost

  const canProceed = () => {
    switch (step) {
      case 1: return !!selections.fabric
      case 2: return !!selections.color
      case 3: return !!selections.pattern
      case 4: return !!selections.borderWidth && !!selections.zariType
      case 5: return !!selections.blouseStyle
      case 6: return selections.embellishments.length > 0
      case 7: return true
      default: return false
    }
  }

  const toggleEmbellishment = (e: string) => {
    if (e === 'None') {
      setSelections({ ...selections, embellishments: ['None'] })
    } else {
      const filtered = selections.embellishments.filter((x) => x !== 'None')
      if (filtered.includes(e)) {
        setSelections({ ...selections, embellishments: filtered.filter((x) => x !== e) })
      } else {
        setSelections({ ...selections, embellishments: [...filtered, e] })
      }
    }
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">Bespoke Creation</p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Customization Studio
          </h1>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="font-dm text-xs text-warm-gray">Step {step} of {totalSteps}</span>
            <span className="font-dm text-xs text-gold">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-500 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {/* Live Price */}
        {basePrice > 0 && (
          <div className="text-center mb-8">
            <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">Estimated Price</p>
            <p className="font-cormorant text-3xl text-gold">{PRICE_FORMATTER.format(estimatedPrice)}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Fabric */}
          {step === 1 && (
            <div>
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Choose Your Fabric</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {FABRICS.map((fabric) => (
                  <button key={fabric.name} onClick={() => setSelections({ ...selections, fabric: fabric.name })}
                    className={`relative overflow-hidden aspect-[3/4] group border-2 transition-colors ${
                      selections.fabric === fabric.name ? 'border-gold' : 'border-transparent hover:border-border'
                    }`}>
                    <Image src={fabric.img} alt={fabric.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                    <div className="absolute inset-0 bg-dark-ink/40 group-hover:bg-dark-ink/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <p className="font-cormorant text-lg text-ivory">{fabric.name}</p>
                      <p className="font-dm text-xs text-gold-light">from {PRICE_FORMATTER.format(fabric.price)}</p>
                    </div>
                    {selections.fabric === fabric.name && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                        <Check size={14} className="text-dark-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Color */}
          {step === 2 && (
            <div>
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Select Base Color</h2>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-3 max-w-xl mx-auto">
                {COLORS.map((hex) => (
                  <button key={hex} onClick={() => setSelections({ ...selections, color: hex })}
                    className={`w-full aspect-square rounded-full border-2 transition-all hover:scale-110 ${
                      selections.color === hex ? 'border-gold scale-110 ring-4 ring-gold/20' : 'border-border'
                    }`}
                    style={{ backgroundColor: hex }}
                    title={hex} />
                ))}
              </div>
              {selections.color && (
                <div className="text-center mt-6">
                  <p className="font-dm text-sm text-warm-gray">Selected: <span className="font-medium text-dark-ink">{selections.color}</span></p>
                </div>
              )}
              <div className="text-center mt-6">
                <label className="btn-outline cursor-pointer inline-flex">
                  <Upload size={16} className="mr-2" /> Upload Reference Image
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Pattern */}
          {step === 3 && (
            <div>
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Choose Pattern / Motif</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {PATTERNS.map((p) => (
                  <button key={p} onClick={() => setSelections({ ...selections, pattern: p })}
                    className={`p-6 border text-center transition-all ${
                      selections.pattern === p ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                    }`}>
                    <p className="font-cormorant text-lg text-dark-ink">{p}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Border & Pallu */}
          {step === 4 && (
            <div className="space-y-10">
              <div>
                <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Border Width</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                  {BORDER_WIDTHS.map((b) => (
                    <button key={b} onClick={() => setSelections({ ...selections, borderWidth: b })}
                      className={`p-5 border text-center transition-all ${
                        selections.borderWidth === b ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                      }`}>
                      <p className="font-cormorant text-lg text-dark-ink">{b}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Zari Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
                  {ZARI_TYPES.map((z) => (
                    <button key={z} onClick={() => setSelections({ ...selections, zariType: z })}
                      className={`p-5 border text-center transition-all ${
                        selections.zariType === z ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                      }`}>
                      <p className="font-dm text-sm text-dark-ink">{z}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Blouse Style */}
          {step === 5 && (
            <div>
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Blouse Style</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {BLOUSE_STYLES.map((s) => (
                  <button key={s} onClick={() => setSelections({ ...selections, blouseStyle: s })}
                    className={`p-6 border text-center transition-all ${
                      selections.blouseStyle === s ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                    }`}>
                    <p className="font-cormorant text-lg text-dark-ink">{s}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Embellishments */}
          {step === 6 && (
            <div>
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Embellishments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto">
                {EMBELLISHMENTS.map((e) => (
                  <button key={e} onClick={() => toggleEmbellishment(e)}
                    className={`p-5 border text-center transition-all ${
                      selections.embellishments.includes(e) ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                    }`}>
                    <p className="font-cormorant text-lg text-dark-ink">{e}</p>
                    {EMBELLISHMENT_PRICES[e] > 0 && (
                      <p className="font-dm text-xs text-gold mt-1">+{PRICE_FORMATTER.format(EMBELLISHMENT_PRICES[e])}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {step === 7 && (
            <div className="max-w-lg mx-auto space-y-6">
              <h2 className="font-cormorant text-2xl text-dark-ink mb-6 text-center">Review Your Creation</h2>
              <div className="bg-blush p-8 space-y-4">
                {[
                  ['Fabric', selections.fabric],
                  ['Color', selections.color],
                  ['Pattern', selections.pattern],
                  ['Border', selections.borderWidth],
                  ['Zari', selections.zariType],
                  ['Blouse', selections.blouseStyle],
                  ['Embellishments', selections.embellishments.join(', ')],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between font-dm text-sm">
                    <span className="text-warm-gray">{label}</span>
                    <span className="text-dark-ink font-medium flex items-center gap-2">
                      {label === 'Color' ? (
                        <><span className="w-4 h-4 rounded-full border border-border inline-block" style={{ backgroundColor: val }} /> {val}</>
                      ) : val}
                    </span>
                  </div>
                ))}
                <div className="h-[1px] bg-border" />
                <div className="flex justify-between items-baseline">
                  <span className="font-cormorant text-lg text-dark-ink">Estimated Price</span>
                  <span className="font-cormorant text-2xl text-gold">{PRICE_FORMATTER.format(estimatedPrice)}</span>
                </div>
                <p className="font-dm text-[10px] text-warm-gray">Estimated delivery: 21 working days</p>
              </div>
              <div className="space-y-1">
                <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Additional Notes</label>
                <textarea
                  value={selections.notes}
                  onChange={(e) => setSelections({ ...selections, notes: e.target.value })}
                  className="input-field min-h-[100px] resize-none"
                  placeholder="Any special requirements or references..."
                />
              </div>
              <button onClick={() => alert('Customization request submitted! We\'ll send you a confirmation email shortly.')} className="btn-gold w-full justify-center group">
                Submit Request <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
              className="btn-outline disabled:opacity-30 disabled:cursor-not-allowed">
              <ArrowLeft size={16} className="mr-2" /> Previous
            </button>
            {step < totalSteps && (
              <button onClick={() => setStep(step + 1)} disabled={!canProceed()}
                className="btn-primary group disabled:opacity-30 disabled:cursor-not-allowed">
                Next Step <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
