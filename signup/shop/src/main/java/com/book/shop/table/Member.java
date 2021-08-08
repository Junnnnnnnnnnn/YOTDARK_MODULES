package com.book.shop.table;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="Member")
@Getter @Setter
public class Member {

    @Id
    @Column(name = "member_id")
    private String member_id;

    private String member_name;
    private String member_pass;
    private String member_phone;
    private String member_email;
    private String member_status;
    private String input_time;
    private String update_time;


}
