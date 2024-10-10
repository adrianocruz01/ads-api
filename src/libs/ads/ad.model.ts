import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table
export class Ad extends Model<Ad> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id_campanha: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ad_creation_time: Date;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  ad_creative_bodies: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  ad_creative_link_captions: object;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ad_delivery_start_time: Date;

  @Column({
    type: DataType.TEXT, // Alterado para TEXT
    allowNull: true,
  })
  ad_snapshot_url: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  age_country_gender_reach_breakdown: object;

  @Column({
    type: DataType.STRING, // Este campo geralmente não excede 255 caracteres
    allowNull: true,
  })
  bylines: string;

  @Column({
    type: DataType.STRING, // A moeda é geralmente curta
    allowNull: true,
  })
  currency: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  delivery_by_region: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  demographic_distribution: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  publisher_platforms: object;

  @Column({
    type: DataType.STRING, // Nome da página geralmente curto
    allowNull: true,
  })
  page_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  page_id: string;
}
