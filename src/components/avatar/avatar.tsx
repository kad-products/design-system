'use client';
import { AvatarIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { Avatar } from 'radix-ui';
import styleClasses from './avatar.module.css';

export type User = {
	username: string;
};

export default function KADAvatar({ user, classNameRoot }: { user?: User; classNameRoot: string }): React.ReactNode {
	if (!user) {
		return (
			<Avatar.Root className={classNames(styleClasses.kadAvatarRoot, classNameRoot)}>
				<AvatarIcon className={styleClasses.kadAvatarNoUser} />
			</Avatar.Root>
		);
	}
	return (
		<Avatar.Root className={classNames(styleClasses.kadAvatarRoot, classNameRoot)}>
			<Avatar.Image
				className={styleClasses.kadAvatarImage}
				src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				alt="Colm Tuite"
			/>
			<Avatar.Fallback className={styleClasses.kadAvatarFallback} delayMs={600}>
				{user.username.charAt(0).toUpperCase()}
			</Avatar.Fallback>
		</Avatar.Root>
	);
}
