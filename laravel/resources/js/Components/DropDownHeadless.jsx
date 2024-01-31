import { Menu } from '@headlessui/react'

export default function DropDownHeadless( Items, title ) {
    return (
        <Menu>
            <Menu.Button>{title}</Menu.Button>
            <Menu.Items>
                {Object.values(Items).map((item) => (
                    <Menu.Item key={item.href} as={Fragment}>
                        {({ active }) => (
                            <a
                                href={item.href}
                                className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                    }`}
                            >
                                {item.label}
                            </a>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}