/**
 * CronixUI - Shared Component Prop Types
 *
 * These types can be imported by any framework package to ensure
 * consistent prop interfaces across React, Svelte, Solid, Vue, etc.
 */

// ============================================================================
// Common Types
// ============================================================================

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'default';
export type Placement = 'top' | 'bottom' | 'left' | 'right';
export type Direction = 'horizontal' | 'vertical';

// ============================================================================
// Button
// ============================================================================

export interface ButtonProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// ============================================================================
// Input / Textarea
// ============================================================================

export interface InputProps {
  value?: string;
  placeholder?: string;
  size?: ComponentSize;
  disabled?: boolean;
  error?: boolean;
  icon?: string;
  onChange?: (value: string) => void;
}

export interface TextareaProps {
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
}

// ============================================================================
// Checkbox / Radio
// ============================================================================

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export interface RadioProps {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

// ============================================================================
// Select
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

// ============================================================================
// Toggle
// ============================================================================

export interface ToggleProps {
  on?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
  onChange?: (on: boolean) => void;
}

// ============================================================================
// Slider
// ============================================================================

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

// ============================================================================
// Modal
// ============================================================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  size?: ModalSize;
}

// ============================================================================
// Alert
// ============================================================================

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertVariant;
  title?: string;
  message?: string;
  dismissible?: boolean;
  onClose?: () => void;
}

// ============================================================================
// Badge / Tag
// ============================================================================

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  solid?: boolean;
}

export interface TagProps {
  label: string;
  variant?: BadgeVariant;
  onRemove?: () => void;
}

// ============================================================================
// Avatar
// ============================================================================

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
}

export interface AvatarGroupProps {
  max?: number;
}

// ============================================================================
// Card
// ============================================================================

export interface CardProps {
  clickable?: boolean;
  onClick?: () => void;
}

// ============================================================================
// Progress
// ============================================================================

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ComponentSize;
}

// ============================================================================
// Spinner / Skeleton
// ============================================================================

export interface SpinnerProps {
  size?: ComponentSize;
}

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rectangular' | 'circular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

// ============================================================================
// Table
// ============================================================================

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
}

// ============================================================================
// List
// ============================================================================

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
}

export interface ListProps {
  items: ListItem[];
  clickable?: boolean;
  onSelect?: (id: string) => void;
}

// ============================================================================
// Tooltip
// ============================================================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children?: unknown;
}

// ============================================================================
// Tabs
// ============================================================================

export interface TabsProps {
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
}

// ============================================================================
// Accordion
// ============================================================================

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  allowMultiple?: boolean;
  defaultOpen?: number[];
}

// ============================================================================
// Toast
// ============================================================================

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
}

// ============================================================================
// Pagination
// ============================================================================

export interface PaginationProps {
  total: number;
  current?: number;
  onChange?: (page: number) => void;
}

// ============================================================================
// Search
// ============================================================================

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
}

export interface SearchProps {
  value?: string;
  results?: SearchItem[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onSelect?: (id: string) => void;
}

// ============================================================================
// Command Palette
// ============================================================================

export interface CommandPaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  shortcut?: string;
  icon?: string;
}

export interface CommandPaletteProps {
  commands: CommandPaletteItem[];
  open?: boolean;
  onClose?: () => void;
  onSelect?: (id: string) => void;
}

// ============================================================================
// Navigation
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
}

export interface NavProps {
  items: NavItem[];
  active?: string;
  onSelect?: (id: string) => void;
}

// ============================================================================
// Breadcrumb
// ============================================================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// ============================================================================
// Stat
// ============================================================================

export type StatDeltaType = 'up' | 'down' | 'neutral';

export interface StatProps {
  value: string | number;
  label: string;
  delta?: string;
  deltaType?: StatDeltaType;
}

// ============================================================================
// Dropdown
// ============================================================================

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  divider?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger?: unknown;
  onSelect?: (id: string) => void;
}

// ============================================================================
// Stepper
// ============================================================================

export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep?: number;
  onChange?: (step: number) => void;
}

// ============================================================================
// DatePicker
// ============================================================================

export interface DatePickerProps {
  value?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  onChange?: (date: string) => void;
}

// ============================================================================
// Chip
// ============================================================================

export type ChipVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface ChipProps {
  selected?: boolean;
  removable?: boolean;
  variant?: ChipVariant;
  onClick?: () => void;
  onRemove?: () => void;
}

// ============================================================================
// Timeline
// ============================================================================

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

// ============================================================================
// Drawer
// ============================================================================

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: ComponentSize;
}

// ============================================================================
// Popover
// ============================================================================

export interface PopoverProps {
  trigger: unknown;
  placement?: Placement;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

// ============================================================================
// TreeView
// ============================================================================

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: string;
  expanded?: boolean;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
}

// ============================================================================
// ColorPicker
// ============================================================================

export interface ColorPickerProps {
  value?: string;
  presets?: string[];
  showInput?: boolean;
  onChange?: (color: string) => void;
}

// ============================================================================
// EmptyState
// ============================================================================

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: unknown;
}

// ============================================================================
// Notification
// ============================================================================

export interface NotificationProps {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

// ============================================================================
// FileUpload
// ============================================================================

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: unknown[]) => void;
}

// ============================================================================
// Form Group
// ============================================================================

export interface FormGroupProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

// ============================================================================
// Container
// ============================================================================

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'fluid';

export interface ContainerProps {
  size?: ContainerSize;
}

// ============================================================================
// Stack
// ============================================================================

export interface StackProps {
  direction?: Direction;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

// ============================================================================
// Typography
// ============================================================================

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';
  size?: ComponentSize;
  muted?: boolean;
  mono?: boolean;
}
