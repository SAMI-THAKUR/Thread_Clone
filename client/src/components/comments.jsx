import { Icon } from "@iconify/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
} from "@chakra-ui/react";

export default function Comment(props) {
  return (
    <section className="bg-transparent pb-5 px-8">
      <div className="max-w-2xl mx-auto">
        <article className="py-3 text-base bg-transparent">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center font-Konkhmer tracking-wider">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough"
                />
                Michael Gough
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time
                  pubdate
                  datetime="2022-02-08"
                  title="February 8th, 2022"
                >
                  Feb. 8, 2022
                </time>
              </p>
            </div>
            <Menu>
              <MenuButton className="dark:text-darktext text-text">
                <Icon
                  icon="icon-park-solid:more-two"
                  className="my-auto text-xl"
                />
              </MenuButton>
              <Portal>
                <MenuList py="1px" px="2px">
                  <MenuItem>
                    <div className="flex gap-4 ">
                      <Icon
                        icon="solar:copy-bold"
                        className="my-auto text-sm"
                      />
                      <span className="font-Konkhmer text-sm">
                        Copy
                      </span>
                    </div>
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </footer>
          <p className="text-text dark:text-darktext font-robo">
            Very straight-to-point article. Really worth time reading.
            Thank you! But tools are just the instruments for the UX
            designers. The knowledge of the design tools are as
            important as the creation of the design strategy.
          </p>
        </article>
        <hr className="border-gray-600 mt-2"></hr>
      </div>
    </section>
  );
}
