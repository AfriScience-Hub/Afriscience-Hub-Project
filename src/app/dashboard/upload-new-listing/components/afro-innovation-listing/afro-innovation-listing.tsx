'use client';

import { Lightbulb, User, IdCard } from 'lucide-react';
import CollapsibleSection from '../CollapsibleSection';
import InnovationIdentitySection from './components/InnovationIdentitySection';
import InnovationDetailsSection from './components/InnovationDetailsSection';
import InnovatorInfoSection from './components/InnovatorInfoSection';

interface Dimensions { length: string; width: string; height: string; unit: string; }
interface Weight { value: string; unit: string; }
interface GalleryFile { category: string; type: 'image' | 'video'; name: string; caption: string; }
interface LicenseDoc { title: string; issuer: string; date: string; file: string; }

interface AfroInnovationListingProps {
  name: string; setName: (v: string) => void;
  profileImage: string | null; setProfileImage: (v: string | null) => void;
  country: string; setCountry: (v: string) => void;
  bio: string; setBio: (v: string) => void;
  AFRICAN_COUNTRIES: string[];
  innovFields: string[]; setInnovFields: (v: string[] | ((p: string[]) => string[])) => void;
  innovInterests: string[]; setInnovInterests: (v: string[] | ((p: string[]) => string[])) => void;
  innovOwnership: string; setInnovOwnership: (v: string) => void;
  innovStage: string; setInnovStage: (v: string) => void;
  innovSdgs: string[]; setInnovSdgs: (v: string[] | ((p: string[]) => string[])) => void;
  innovMaterials: string[]; setInnovMaterials: (v: string[] | ((p: string[]) => string[])) => void;
  innovDimensions: Dimensions; setInnovDimensions: (v: Dimensions | ((p: Dimensions) => Dimensions)) => void;
  innovWeight: Weight; setInnovWeight: (v: Weight | ((p: Weight) => Weight)) => void;
  innovUserGroups: string[]; setInnovUserGroups: (v: string[] | ((p: string[]) => string[])) => void;
  innovApplications: string[]; setInnovApplications: (v: string[] | ((p: string[]) => string[])) => void;
  innovImpact: string[]; setInnovImpact: (v: string[] | ((p: string[]) => string[])) => void;
  innovRecommendations: string[]; setInnovRecommendations: (v: string[] | ((p: string[]) => string[])) => void;
  innovCautions: string[]; setInnovCautions: (v: string[] | ((p: string[]) => string[])) => void;
  innovLicenses: LicenseDoc[]; setInnovLicenses: (v: LicenseDoc[] | ((p: LicenseDoc[]) => LicenseDoc[])) => void;
  innovAwards: LicenseDoc[]; setInnovAwards: (v: LicenseDoc[] | ((p: LicenseDoc[]) => LicenseDoc[])) => void;
  innovGallery: GalleryFile[]; setInnovGallery: (v: GalleryFile[] | ((p: GalleryFile[]) => GalleryFile[])) => void;
  innovatorName: string; setInnovatorName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  altPhone: string; setAltPhone: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  website: string; setWebsite: (v: string) => void;
  socialLinks: { linkedin: string; twitter: string; instagram: string; facebook: string };
  setSocialLinks: (v: { linkedin: string; twitter: string; instagram: string; facebook: string } | ((p: { linkedin: string; twitter: string; instagram: string; facebook: string }) => { linkedin: string; twitter: string; instagram: string; facebook: string })) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
}

export default function AfroInnovationListing(props: AfroInnovationListingProps) {
  return (
    <>
      <CollapsibleSection title="Innovation Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} badge="Required">
        <InnovationIdentitySection
          name={props.name} setName={props.setName}
          profileImage={props.profileImage} setProfileImage={props.setProfileImage}
          country={props.country} setCountry={props.setCountry}
          bio={props.bio} setBio={props.setBio}
          AFRICAN_COUNTRIES={props.AFRICAN_COUNTRIES}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Innovation Details" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
        <InnovationDetailsSection
          innovFields={props.innovFields} setInnovFields={props.setInnovFields}
          innovInterests={props.innovInterests} setInnovInterests={props.setInnovInterests}
          innovOwnership={props.innovOwnership} setInnovOwnership={props.setInnovOwnership}
          innovStage={props.innovStage} setInnovStage={props.setInnovStage}
          innovSdgs={props.innovSdgs} setInnovSdgs={props.setInnovSdgs}
          innovMaterials={props.innovMaterials} setInnovMaterials={props.setInnovMaterials}
          innovDimensions={props.innovDimensions} setInnovDimensions={props.setInnovDimensions}
          innovWeight={props.innovWeight} setInnovWeight={props.setInnovWeight}
          innovUserGroups={props.innovUserGroups} setInnovUserGroups={props.setInnovUserGroups}
          innovApplications={props.innovApplications} setInnovApplications={props.setInnovApplications}
          innovImpact={props.innovImpact} setInnovImpact={props.setInnovImpact}
          innovRecommendations={props.innovRecommendations} setInnovRecommendations={props.setInnovRecommendations}
          innovCautions={props.innovCautions} setInnovCautions={props.setInnovCautions}
          innovLicenses={props.innovLicenses} setInnovLicenses={props.setInnovLicenses}
          innovAwards={props.innovAwards} setInnovAwards={props.setInnovAwards}
          innovGallery={props.innovGallery} setInnovGallery={props.setInnovGallery}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Innovator's Information" icon={<User className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
        <InnovatorInfoSection
          innovatorName={props.innovatorName} setInnovatorName={props.setInnovatorName}
          phone={props.phone} setPhone={props.setPhone}
          altPhone={props.altPhone} setAltPhone={props.setAltPhone}
          email={props.email} setEmail={props.setEmail}
          website={props.website} setWebsite={props.setWebsite}
          socialLinks={props.socialLinks} setSocialLinks={props.setSocialLinks}
          agreed={props.agreed} setAgreed={props.setAgreed}
        />
      </CollapsibleSection>
    </>
  );
}
