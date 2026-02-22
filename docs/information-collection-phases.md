# Funeral Program Information Collection Phases

## Phase 1: Core Information Collection

### Step 1: Deceased's Basic Information
- **Personal Details**
  - Full name (first, middle, last, maiden name)
  - Nickname/Preferred name
  - Birth date & place
  - Death date & place
  - Age at passing

### Step 2: Life Story & Memories
- **Free-form Story Input** (AI will help structure this)
  - Life accomplishments
  - Career/education highlights
  - Hobbies and interests
  - Favorite memories
  - Character traits
  
### Step 3: Family Information
- **Surviving Family**
  - Spouse/Partner name
  - Children (names)
  - Number of grandchildren
  - Number of great-grandchildren
  - Parents (if applicable)
  - Siblings
  
- **Predeceased Family**
  - Option to list those who passed before

### Step 4: Service Details
- **Service Information**
  - Service type (funeral, memorial, celebration of life)
  - Date & time
  - Venue name & address
  - Officiant/celebrant name
  - Viewing/visitation details (if applicable)
  
### Step 5: Special Elements
- **Additional Information**
  - Pallbearers
  - Honorary pallbearers
  - Special music selections
  - Charitable donations info
  - Special acknowledgments

## Phase 2: Template Population System

### Data Mapping Structure
```typescript
interface ProgramData {
  // Basic Info (populates header)
  fullName: string;
  lifeSpan: string; // "1945 - 2024"
  primaryPhoto: string;
  
  // Family Section (populates family listings)
  survivingFamily: {
    spouse?: string;
    children: string[];
    grandchildrenCount: number;
    greatGrandchildrenCount: number;
    siblings: string[];
    parents?: string[];
  };
  
  // Service Info (populates service details)
  serviceDetails: {
    type: string;
    dateTime: string;
    location: string;
    officiant: string;
  };
  
  // Content Sections
  obituary: string;
  orderOfService: ServiceEvent[];
  pallbearers: string[];
  acknowledgments: string;
}
```

### Template Variable System
- `{{deceased.fullName}}`
- `{{deceased.birthDate}} - {{deceased.deathDate}}`
- `{{family.children.list}}`
- `{{family.grandchildren.count}} grandchildren`
- `{{service.location}}`
- `{{service.dateTime}}`

## Implementation Recommendations

### 1. Progressive Disclosure
- Start with minimal required fields
- Expand sections as needed
- Optional fields clearly marked

### 2. Smart Defaults
- Pre-fill common service elements
- Suggest typical timeline items
- Provide example text for guidance

### 3. Data Validation
- Date consistency checks
- Required field validation
- Relationship logic (e.g., parents for younger deceased)

### 4. Save Progress
- Auto-save every field change
- Allow users to leave and return
- Progress indicator showing completion

### 5. AI Enhancement Points
- Parse free-form text into structured data
- Generate obituary from life story
- Suggest service order based on tradition
- Create acknowledgment text