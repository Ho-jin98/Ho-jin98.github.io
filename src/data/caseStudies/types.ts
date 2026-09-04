export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyBlock {
  label: string;
  text: string;
  tone?: 'primary' | 'dark';
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
  tone?: 'primary' | 'dark';
}

export interface CaseStudyEvidence {
  label: string;
  caption?: string;
}

export interface CaseFlowNode {
  title: string;
  text?: string;
  tone?: 'primary';
}

export type CaseDiagram =
  | {
      type: 'sequence';
      density?: 'compact';
      connectorTone?: 'subtle';
      spacingAfter?: 'roomy';
      layout?: 'deck' | 'roles' | 'phased';
      label?: string;
      text?: string;
      footer?: string;
      phases?: {
        title: string;
        steps: CaseFlowNode[];
      }[];
      steps: CaseFlowNode[];
    }
  | {
      type: 'hub';
      density?: 'compact';
      connectorTone?: 'subtle';
      spacingAfter?: 'roomy';
      label: string;
      sources: CaseFlowNode[];
      target: CaseFlowNode;
    }
  | {
      type: 'merge';
      density?: 'compact';
      connectorTone?: 'subtle';
      spacingAfter?: 'roomy';
      label: string;
      sources: CaseFlowNode[];
      merge: CaseFlowNode;
      result: CaseFlowNode;
    };

export interface CaseStudyHierarchyItem {
  label: string;
  value: string;
  tone?: 'complete' | 'pending';
}

export interface CaseStudyTab {
  id: string;
  label: string;
  title: string;
  text?: string;
  featureItems?: CaseStudyBlock[];
  evidence?: CaseStudyEvidence;
  flow?: (string | { title: string; text?: string; tone?: 'primary' })[];
  diagrams?: CaseDiagram[];
  diagramsLayout?: 'columns';
  metrics?: CaseStudyMetric[];
  cards?: {
    label?: string;
    columns?: 2 | 3 | 4 | 5;
    layout?: 'rows';
    items: CaseStudyBlock[];
  };
  supplementalCards?: {
    label?: string;
    columns?: 2 | 3 | 4 | 5;
    items: CaseStudyBlock[];
  };
  hierarchy?: {
    parent: string;
    items: CaseStudyHierarchyItem[];
    footer: string;
  };
  callout?: string;
  calloutTone?: 'soft' | 'dark';
  subsection?: {
    title: string;
    paragraphs: string[];
    callout?: string;
  };
  comparison?: {
    columns: string[];
    rows: {
      label: string;
      values: string[];
    }[];
    highlightColumn?: number;
  };
  accordions?: {
    title: string;
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
    cards?: CaseStudyBlock[];
    facts?: CaseStudyFact[];
  }[];
  supportCards?: {
    title: string;
    target?: string;
    text?: string;
    image?: {
      src: string;
      alt: string;
      crop?:
        | 'order-verification-result'
        | 'charge-verification-result'
        | 'kafka-integrity-result'
        | 'k6-v1-result'
        | 'k6-v2-result';
    };
    items: CaseStudyFact[];
  }[];
  reliabilityRows?: {
    columns: {
      title: string;
      rows: {
        label: string;
        text: string;
        note?: string;
      }[];
    }[];
  };
  locationCleanup?: {
    lifecycleTitle: string;
    steps: {
      label: string;
      title: string;
      text: string;
      tone?: 'primary';
    }[];
    reasonTitle: string;
    reasons: {
      title: string;
      text: string;
    }[];
    callout: string;
  };
  noShowDecision?: {
    callout?: string;
    columns: {
      title: string;
      policy: string;
      precondition?: string;
      information: string[];
      outcomeNote?: string;
      outcomes: {
        condition: string;
        result: string;
      }[];
      sections?: {
        heading: string;
        text?: string;
        items?: string[];
        outcomes?: {
          condition: string;
          result: string;
        }[];
      }[];
    }[];
  };
  limitation?: {
    current: string[];
    improvement: string[];
    chips?: string[];
    tests?: string[];
  };
}

export type CaseStudyContentBlock =
  | {
      type: 'kServerOverview';
      intro: {
        heading: string;
        paragraphs: string[];
      };
      highlights: string[];
      visualSrc: string;
      visualAlt: string;
    }
  | {
      type: 'hero';
      label: string;
      paragraphs: string[];
      scope: string[];
      visualSrc?: string;
      visualAlt?: string;
    }
  | {
      type: 'prose';
      paragraphs: string[];
    }
  | {
      type: 'cards';
      label?: string;
      columns?: 2 | 3 | 4 | 5;
      items: CaseStudyBlock[];
    }
  | {
      type: 'tabs';
      tabs: CaseStudyTab[];
    }
  | {
      type: 'video';
      src?: string;
      poster?: string;
      mimeType?: string;
      title: string;
      description: string;
    };

export interface CaseStudySection {
  number: string;
  id: string;
  title: string;
  navTitle: string;
  navSubtitle?: string;
  lead: string;
  accent?: string | string[];
  content?: CaseStudyContentBlock[];
  facts?: CaseStudyFact[];
  bullets?: string[];
  flow?: string[];
  states?: CaseStudyFact[];
  blocks?: CaseStudyBlock[];
  metrics?: CaseStudyMetric[];
}

export interface CaseStudyContent {
  projectLabel: string;
  description?: string;
  sections: CaseStudySection[];
}
