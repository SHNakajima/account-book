import { Menu } from '@headlessui/react'

export default function DropDownHeadless({items, title}) {
    return (
        <Menu>
            <Menu.Button>{title}</Menu.Button>
            <Menu.Items>
                {Object.values(items).map((item) => (
                    <Menu.Item key={item.id} as="div">
                        {({ active }) => (
                            <div className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                                item.name
                            </div>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}