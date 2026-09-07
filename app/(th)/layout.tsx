import DocumentLayout from '@/components/portfolio/DocumentLayout';
export { metadata } from '@/components/portfolio/DocumentLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="th">{children}</DocumentLayout>;
}
