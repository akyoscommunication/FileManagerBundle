<?php

namespace Akyos\FileManagerBundle\Repository;

use Akyos\FileManagerBundle\Entity\FileManagerOptions;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FileManagerOptions|null find($id, $lockMode = null, $lockVersion = null)
 * @method FileManagerOptions|null findOneBy(array $criteria, array $orderBy = null)
 * @method FileManagerOptions[]    findAll()
 * @method FileManagerOptions[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FileManagerOptionsRepository extends ServiceEntityRepository
{
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, FileManagerOptions::class);
	}

	// /**
	//  * @return FileManagerOptions[] Returns an array of FileManagerOptions objects
	//  */
	/*
	public function findByExampleField($value)
	{
		return $this->createQueryBuilder('f')
			->andWhere('f.exampleField = :val')
			->setParameter('val', $value)
			->orderBy('f.id', 'ASC')
			->setMaxResults(10)
			->getQuery()
			->getResult()
		;
	}
	*/

	/*
	public function findOneBySomeField($value): ?FileManagerOptions
	{
		return $this->createQueryBuilder('f')
			->andWhere('f.exampleField = :val')
			->setParameter('val', $value)
			->getQuery()
			->getOneOrNullResult()
		;
	}
	*/
}
