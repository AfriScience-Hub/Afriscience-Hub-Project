'use client';

import { ClipboardList } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  TextArea,
  SelectInput,
  FileUpload,
  MultiStringList,
} from '../components/FormField';
import {
  INDUSTRIES,
  CUSTOMER_BASE_OPTIONS,
  GROWTH_PROJECTION_OPTIONS,
} from '../data';
import { wordCount, type CareerFormState } from './types';

export default function BusinessPlanSection({
  value,
  onChange,
}: {
  value: CareerFormState['businessPlan'];
  onChange: (v: CareerFormState['businessPlan']) => void;
}) {
  const words = wordCount(value.description);

  return (
    <SectionCard
      title="Business Plan Summary"
      icon={<ClipboardList className="h-5 w-5 text-brand-red-600" />}
      badge="Required"
      defaultOpen={false}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel
            required
            info="Select the industry that best describes your chosen entrepreneurial career."
          >
            Industry
          </FieldLabel>
          <SelectInput
            value={value.industry}
            onChange={(e) => onChange({ ...value, industry: e.target.value })}
            required
          >
            <option value="">Select Industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </SelectInput>
          {value.industry === 'Other' && (
            <TextInput
              className="mt-2"
              placeholder="Specify industry"
              value={value.industryOther}
              onChange={(e) => onChange({ ...value, industryOther: e.target.value })}
              required
            />
          )}
        </div>
        <div>
          <FieldLabel
            required
            info="How many active customers does your brand currently have?"
          >
            Current Customer Base
          </FieldLabel>
          <SelectInput
            value={value.currentCustomerBase}
            onChange={(e) => onChange({ ...value, currentCustomerBase: e.target.value })}
            required
          >
            <option value="">Select Number</option>
            {CUSTOMER_BASE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>

      <div className="mt-4">
        <FieldLabel required>Description</FieldLabel>
        <TextArea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Give detailed description of your chosen entrepreneurial career"
          required
        />
        <p className={`text-xs mt-1 ${words > 1000 ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
          {words} / 1000 words max.
        </p>
      </div>

      <div className="mt-4 grid gap-4">
        <MultiStringList
          label="Products & Services"
          required
          info="List your brand’s products & services."
          values={value.productsServices}
          onChange={(productsServices) => onChange({ ...value, productsServices })}
          placeholder="Product or service"
        />
        <MultiStringList
          label="Value Proposition"
          required
          info="What features make your products & services more appealing to the market."
          values={value.valuePropositions}
          onChange={(valuePropositions) => onChange({ ...value, valuePropositions })}
        />
        <MultiStringList
          label="Marketing Plan"
          required
          info="What marketing strategies will you adopt to increase your customer base?"
          values={value.marketingPlan}
          onChange={(marketingPlan) => onChange({ ...value, marketingPlan })}
        />
        <MultiStringList
          label="Distribution Plan"
          required
          info="What channels are best for distributing your products & services."
          values={value.distributionPlan}
          onChange={(distributionPlan) => onChange({ ...value, distributionPlan })}
        />
      </div>

      <div className="mt-4">
        <FieldLabel
          required
          info="How many new customers can your brand acquire every 3 months on average?"
        >
          Customer Growth Projection
        </FieldLabel>
        <SelectInput
          value={value.customerGrowthProjection}
          onChange={(e) => onChange({ ...value, customerGrowthProjection: e.target.value })}
          required
        >
          <option value="">Select Growth projection</option>
          {GROWTH_PROJECTION_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </SelectInput>
      </div>

      <div className="mt-6">
        <FieldLabel required info="Provide the information of your competitors.">
          Competitors
        </FieldLabel>
        <div className="space-y-3">
          {value.competitors.map((c, idx) => (
            <div key={idx} className="grid sm:grid-cols-2 gap-2">
              <TextInput
                placeholder="Brand Name"
                value={c.brandName}
                onChange={(e) => {
                  const competitors = [...value.competitors];
                  competitors[idx] = { ...c, brandName: e.target.value };
                  onChange({ ...value, competitors });
                }}
              />
              <div className="flex gap-2">
                <TextInput
                  placeholder="Address"
                  value={c.address}
                  onChange={(e) => {
                    const competitors = [...value.competitors];
                    competitors[idx] = { ...c, address: e.target.value };
                    onChange({ ...value, competitors });
                  }}
                />
                {value.competitors.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-brand-red-600 font-semibold"
                    onClick={() =>
                      onChange({
                        ...value,
                        competitors: value.competitors.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-bold text-brand-navy-900 hover:underline"
            onClick={() =>
              onChange({
                ...value,
                competitors: [...value.competitors, { brandName: '', address: '' }],
              })
            }
          >
            + Add competitor
          </button>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <p className="sm:col-span-3 text-sm font-medium text-neutral-black">
          Employment Projection (how many employees within 3 business years?)
        </p>
        {(['y1', 'y2', 'y3'] as const).map((k, i) => (
          <div key={k}>
            <FieldLabel required>{i + 1} year period</FieldLabel>
            <TextInput
              type="number"
              min={0}
              value={value.employmentProjection[k]}
              onChange={(e) =>
                onChange({
                  ...value,
                  employmentProjection: {
                    ...value.employmentProjection,
                    [k]: e.target.value,
                  },
                })
              }
              required
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid sm:grid-cols-4 gap-3">
        <p className="sm:col-span-4 text-sm font-medium text-neutral-black">
          Revenue Projection (within 3 business years)
        </p>
        <div>
          <FieldLabel required>Currency</FieldLabel>
          <SelectInput
            value={value.revenueProjection.currency}
            onChange={(e) =>
              onChange({
                ...value,
                revenueProjection: {
                  ...value.revenueProjection,
                  currency: e.target.value as 'USD' | 'Local',
                },
              })
            }
          >
            <option value="USD">USD</option>
            <option value="Local">Local</option>
          </SelectInput>
        </div>
        {(['y1', 'y2', 'y3'] as const).map((k, i) => (
          <div key={k}>
            <FieldLabel required>{i + 1} year period</FieldLabel>
            <TextInput
              value={value.revenueProjection[k]}
              onChange={(e) =>
                onChange({
                  ...value,
                  revenueProjection: { ...value.revenueProjection, [k]: e.target.value },
                })
              }
              required
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <MultiStringList
          label="Career Challenges"
          required
          info="What are the current and anticipated challenges of your chosen entrepreneurial career?"
          values={value.careerChallenges}
          onChange={(careerChallenges) => onChange({ ...value, careerChallenges })}
        />
      </div>

      <div className="mt-6">
        <FieldLabel required>Bank Relationship</FieldLabel>
        <div className="space-y-3">
          {value.bankRelationships.map((b, idx) => (
            <div key={idx} className="grid sm:grid-cols-3 gap-2">
              <TextInput
                placeholder="Bank Name"
                value={b.bankName}
                onChange={(e) => {
                  const bankRelationships = [...value.bankRelationships];
                  bankRelationships[idx] = { ...b, bankName: e.target.value };
                  onChange({ ...value, bankRelationships });
                }}
              />
              <TextInput
                placeholder="Bank Address"
                value={b.bankAddress}
                onChange={(e) => {
                  const bankRelationships = [...value.bankRelationships];
                  bankRelationships[idx] = { ...b, bankAddress: e.target.value };
                  onChange({ ...value, bankRelationships });
                }}
              />
              <div className="flex gap-2">
                <TextInput
                  placeholder="Account Number"
                  value={b.accountNumber}
                  onChange={(e) => {
                    const bankRelationships = [...value.bankRelationships];
                    bankRelationships[idx] = { ...b, accountNumber: e.target.value };
                    onChange({ ...value, bankRelationships });
                  }}
                />
                {value.bankRelationships.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-brand-red-600 font-semibold"
                    onClick={() =>
                      onChange({
                        ...value,
                        bankRelationships: value.bankRelationships.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-bold text-brand-navy-900 hover:underline"
            onClick={() =>
              onChange({
                ...value,
                bankRelationships: [
                  ...value.bankRelationships,
                  { bankName: '', bankAddress: '', accountNumber: '' },
                ],
              })
            }
          >
            + Add bank
          </button>
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel info="Provide details of current personal liabilities (if any).">
          Personal Liabilities
        </FieldLabel>
        <div className="space-y-3">
          {value.personalLiabilities.map((l, idx) => (
            <div key={idx} className="grid sm:grid-cols-5 gap-2">
              <TextInput
                placeholder="Institution"
                value={l.institution}
                onChange={(e) => {
                  const personalLiabilities = [...value.personalLiabilities];
                  personalLiabilities[idx] = { ...l, institution: e.target.value };
                  onChange({ ...value, personalLiabilities });
                }}
              />
              <TextInput
                placeholder="Total Amount"
                value={l.totalAmount}
                onChange={(e) => {
                  const personalLiabilities = [...value.personalLiabilities];
                  personalLiabilities[idx] = { ...l, totalAmount: e.target.value };
                  onChange({ ...value, personalLiabilities });
                }}
              />
              <TextInput
                placeholder="Remaining Balance"
                value={l.remainingBalance}
                onChange={(e) => {
                  const personalLiabilities = [...value.personalLiabilities];
                  personalLiabilities[idx] = { ...l, remainingBalance: e.target.value };
                  onChange({ ...value, personalLiabilities });
                }}
              />
              <TextInput
                placeholder="Tenor (months)"
                value={l.tenorMonths}
                onChange={(e) => {
                  const personalLiabilities = [...value.personalLiabilities];
                  personalLiabilities[idx] = { ...l, tenorMonths: e.target.value };
                  onChange({ ...value, personalLiabilities });
                }}
              />
              <div className="flex gap-2">
                <SelectInput
                  value={l.currency}
                  onChange={(e) => {
                    const personalLiabilities = [...value.personalLiabilities];
                    personalLiabilities[idx] = {
                      ...l,
                      currency: e.target.value as 'USD' | 'Local',
                    };
                    onChange({ ...value, personalLiabilities });
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="Local">Local</option>
                </SelectInput>
                <button
                  type="button"
                  className="text-xs text-brand-red-600 font-semibold"
                  onClick={() =>
                    onChange({
                      ...value,
                      personalLiabilities: value.personalLiabilities.filter((_, i) => i !== idx),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-bold text-brand-navy-900 hover:underline"
            onClick={() =>
              onChange({
                ...value,
                personalLiabilities: [
                  ...value.personalLiabilities,
                  {
                    institution: '',
                    totalAmount: '',
                    remainingBalance: '',
                    tenorMonths: '',
                    currency: 'USD',
                  },
                ],
              })
            }
          >
            + Add liability
          </button>
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel required>Risks & Mitigation</FieldLabel>
        <div className="space-y-3">
          {value.risks.map((r, idx) => (
            <div key={idx} className="grid sm:grid-cols-2 gap-2">
              <TextInput
                placeholder="Risk type"
                value={r.riskType}
                onChange={(e) => {
                  const risks = [...value.risks];
                  risks[idx] = { ...r, riskType: e.target.value };
                  onChange({ ...value, risks });
                }}
              />
              <div className="flex gap-2">
                <TextInput
                  placeholder="Prevention & Control"
                  value={r.preventionControl}
                  onChange={(e) => {
                    const risks = [...value.risks];
                    risks[idx] = { ...r, preventionControl: e.target.value };
                    onChange({ ...value, risks });
                  }}
                />
                {value.risks.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-brand-red-600 font-semibold"
                    onClick={() =>
                      onChange({
                        ...value,
                        risks: value.risks.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-bold text-brand-navy-900 hover:underline"
            onClick={() =>
              onChange({
                ...value,
                risks: [...value.risks, { riskType: '', preventionControl: '' }],
              })
            }
          >
            + Add risk
          </button>
        </div>
      </div>

      <div className="mt-6">
        <FileUpload
          label="Career Budget Breakdown"
          required
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          hint="Upload the estimated budget breakdown document. Document file formats only."
          file={value.budgetDocument}
          onChange={(f) => onChange({ ...value, budgetDocument: f })}
          onClear={() => onChange({ ...value, budgetDocument: null })}
        />
      </div>
    </SectionCard>
  );
}
