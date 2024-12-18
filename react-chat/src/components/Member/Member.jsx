import styles from "./Member.module.scss";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import { Link } from "react-router-dom";
import ROUTES from "../../config/routes";
import { useInView } from "react-intersection-observer";
import { getLastOnline } from "../../utils";

const Member = ({ member, isCreator }) => {
  const link = `${ROUTES.profile}/${member.id}`;
  const memberAvatarUrl = member.avatar ?? defaultAvatar;
  const name = `${member.first_name} ${member.last_name}`;
  const online = member.is_online ? "Онлайн" : getLastOnline(member.last_online_at);
  const creator = isCreator ? "Создатель" : null;
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  const avatar = inView ?
    <img ref={ref} className={styles.avatar} src={memberAvatarUrl} alt="avatar" />
    : <div ref={ref} className={styles.skeleton}> </div>;

  return (
    <Link to={link} className={styles.member}>
      <div className={styles.left}>
        {avatar}
        <div className={styles.memberInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.online}>{online}</span>
        </div>
      </div>
      <span className={styles.creator}>{creator}</span>
    </Link>
  );
};

export default Member;
