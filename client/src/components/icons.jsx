const Icon = ({ className = "w-5 h-5", children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const User = (props) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const Mail = (props) => (
  <Icon {...props}>
    <path d="M3 7.5l9 6 9-6" />
    <path d="M21 8.25v8.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.25" />
  </Icon>
);

export const Lock = (props) => (
  <Icon {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

export const ArrowRight = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="M15 6l6 6-6 6" />
  </Icon>
);

export const AlertCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </Icon>
);

export const Search = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.35-4.35" />
  </Icon>
);

export const Plus = (props) => (
  <Icon {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const CheckCircle2 = (props) => (
  <Icon {...props}>
    <path d="M9 12.5l2 2 4-4" />
    <circle cx="12" cy="12" r="8" />
  </Icon>
);

export const ListTodo = (props) => (
  <Icon {...props}>
    <path d="M8 6h12" />
    <path d="M8 12h12" />
    <path d="M8 18h12" />
    <path d="M5 6h.01" />
    <path d="M5 12h.01" />
    <path d="M5 18h.01" />
  </Icon>
);

export const Loader2 = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" opacity="0.15" />
    <path d="M20 12a8 8 0 0 0-8-8" />
  </Icon>
);

export const AlignLeft = (props) => (
  <Icon {...props}>
    <path d="M4 6h16" />
    <path d="M4 12h12" />
    <path d="M4 18h16" />
  </Icon>
);

export const Calendar = (props) => (
  <Icon {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
  </Icon>
);

export const Flag = (props) => (
  <Icon {...props}>
    <path d="M4 22V6" />
    <path d="M4 6c0 0 7-2 8 1s-1.5 5-1.5 5S12 9 14 9s4 1 4 1v9" />
  </Icon>
);

export const Trash2 = (props) => (
  <Icon {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </Icon>
);

export const Clock = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </Icon>
);

export const RotateCcw = (props) => (
  <Icon {...props}>
    <path d="M3 12a9 9 0 0 1 14-7.74" />
    <path d="M7 9V3h6" />
    <path d="M12 16a4 4 0 1 0-4-4" />
  </Icon>
);

export const LogOut = (props) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);
