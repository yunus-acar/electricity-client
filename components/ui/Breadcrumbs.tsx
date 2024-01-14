import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';
import { IoChevronForward } from 'react-icons/io5';
import Link from 'next/link';
import React from 'react';

interface Props {
  items: Array<{
    label: string;
    href: string;
  }>;
}

const Breadcrumbs = (props: Props) => {
  const { items } = props;
  return (
    <Breadcrumb spacing="8px" separator={<IoChevronForward color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard" as={Link}>
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>

      {items.map((item, index) => {
        return (
          <BreadcrumbItem key={index} isCurrentPage={index === items.length}>
            <BreadcrumbLink href={item.href} as={Link}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
