import { Menu } from '@headlessui/react'

export default function DropDownHeadless( Items, title ) {
  return (
    <Menu>
      <Menu.Button>{title}</Menu.Button>
      <Menu.Items>
            {Object.values(Items).map(item => (
                <Menu.Item key={item.id}>
                    {item.name}
                </Menu.Item>
            ))}
      </Menu.Items>
    </Menu>
  )
}